const transporter = require("../../config/mailer");
const { Service, Service_status, User, UserRole } = require("../../db");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
require("dotenv").config();
const destinationEmail = process.env.EMAIL_MAILER;
const addServiceController = async (
  product_model,
  product_income_date,
  user_diagnosis,
  ClientId,
  technicianId
) => {
  if (
    !product_model ||
    !product_income_date ||
    !user_diagnosis ||
    !ClientId ||
    !technicianId
  ) {
    return "faltan datos";
  } else {
    const clientObj = await User.findByPk(ClientId);
    const technicianObj = await User.findByPk(technicianId);
    if (!clientObj || !technicianObj) {
      return {
        error: true,
        response: "id no valido",
      };
    }
    const rolTech = await UserRole.findByPk(technicianObj.rolId);
    const rolCust = await UserRole.findByPk(clientObj.rolId);
    console.log(rolCust.role_name);

    if (rolCust.role_name === "customer") {
      if (rolTech.role_name === "technician") {
        const newService = await Service.create({
          product_model,
          product_income_date,
        });
        await newService.setTechnician(technicianObj);
        await newService.setClient(clientObj);

        const newServiceStatus = await Service_status.create({
          user_diagnosis,
          technical_diagnosis: "pending",
          final_diagnosis: "pending",
          confirm_repair: false,
          reparir_finish: false,
          ServiceId: newService.id,
        });
        const createdService = await Service.findByPk(newService.id, {
          include: [Service_status],
        });
        const date = new Date(newService.createdAt).toISOString().split("T")[0];
        console.log(date);
        //envio del mail
        await transporter.sendMail({
          from: `"aviso de ingreso 👻"  ${destinationEmail}`, // sender address
          to: clientObj.email, // list of receivers
          subject: "ingreso a servicio ✔", // Subject line
          html: `su equipo se ingreso a nuestro sistema el dia ${date}<br><br>
          <div style="background: linear-gradient(30deg, white, orange 50%, white , orange 50%, black 100%); padding: 20px; text-align: center;">
            <h2 style="color: #000;">hyper mega red</h2>
            <p style="color:#FFFFFF; font-size:large;">Gracias por usar nuestro servicio.</p>
          </div>`, // HTML body
        });

        //corta envio
        return createdService;
      } else {
        return {
          error: true,
          response: `There is no technician with that ID`,
        };
      }
    } else {
      return {
        error: true,
        response: `There is no customer with that ID`,
      };
    }
  }
};
const updateServiceStatusController = async (id, field, value) => {
  const serviceStatus = await Service_status.findOne({ where: { id } });
  if (!serviceStatus) {
    return {
      error: true,
      response: `status not found`,
    };
  }
  if (
    value === true ||
    field === "technical_diagnosis" ||
    field === "final_diagnosis"
  ) {
    serviceStatus[field] = value;
    await serviceStatus.save();
    const service = await Service.findOne({
      where: { id: serviceStatus.ServiceId },
      include: [Service_status],
    });
    const clientObj = await User.findByPk(service.userId);

    await transporter.sendMail({
      from: `"aviso de actualizacion de estado 👻"  ${destinationEmail}`, // sender address
      to: clientObj.email, // list of receivers
      subject: "actualizacion de estado✔", // Subject line
      text: `se modifico el estado de su equipo ${service.product_model} a ${field}:${value}`, // plain text body
    });
    return service;
  } else {
    return {
      error: true,
      response: `no se modifico el status`,
    };
  }
};

const getAllServicesController = async () => {
  const services = await Service.findAll();
  if (services.length === 0) {
    return {
      error: true,
      response: "error service not found",
    };
  }
  const arrayOfServices = await Promise.all(
    services.map(async (service) => {
      return await Service.findByPk(service.id, {
        include: [Service_status],
      });
    })
  );
  return arrayOfServices;
};

const getServiceByIdController = async (id) => {
  const service = await Service.findByPk(id);
  if (!service) {
    return {
      error: true,
      response: `service not found`,
    };
  }
  return service;
};
const getServiceByClient = async (id) => {
  const Services = await Service.findAll({
    where: { userId: id },
  });
  if (Services.length === 0) {
    return {
      error: true,
      response: `service not found`,
    };
  }
  return Services;
};

const getServiceByModel = async (model) => {
  const Services = await Service.findAll({
    where: sequelize.where(
      sequelize.fn('lower', sequelize.col('product_model')),
      { [Op.like]: '%' + model.toLowerCase() + '%' }
    )
  });
  if (Services.length === 0) {
    return {
      error: true,
      response: `service not found`,
    };
  }
  return Services;
};
module.exports = {
  addServiceController,
  updateServiceStatusController,
  getAllServicesController,
  getServiceByIdController,
  getServiceByClient,
  getServiceByModel,
};
