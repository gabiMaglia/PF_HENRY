const transporter = require("../../config/mailer");
const cloudinary = require("../../config/cloudinaryConfig");
const {
  Service,
  Service_status,
  Service_image,
  User,
  UserRole,
} = require("../../db");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
require("dotenv").config();
const destinationEmail = process.env.EMAIL_MAILER;

const addServiceController = async (
  product_model,
  product_income_date,
  // product_image,
  product_image_url,
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
    return {
      error: true,
      response: "Faltan datos",
    };
  } else {
    const clientObj = await User.findByPk(ClientId);
    const technicianObj = await User.findByPk(technicianId);
    if (!clientObj || !technicianObj) {
      return {
        error: true,
        response: "Id no valido",
      };
    }
    const rolTech = await UserRole.findByPk(technicianObj.rolId);
    const rolCust = await UserRole.findByPk(clientObj.rolId);

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

        if (product_image_url) {
          // No se sube la imagen a Cloudinary aca ya que obtenemos la URL que nos envia el front
          const newServiceImage = await Service_image.create({
            address: product_image_url,
            ServiceId: newService.id,
          });
          await newService.addService_image(newServiceImage);
        }

        const createdService = await Service.findByPk(newService.id, {
          include: [Service_status, Service_image],
        });
        const date = new Date(newService.createdAt).toISOString().split("T")[0];
        //envio del mail
        await transporter.sendMail({
          from: `"aviso de ingreso 👻"  ${destinationEmail}`,
          to: clientObj.email, // list of receivers
          subject: "ingreso a servicio ✔",
          html: `su equipo se ingreso a nuestro sistema el dia ${date}<br><br>
          <div style="background: linear-gradient(30deg, white, orange 50%, white , orange 50%, black 100%); padding: 20px; text-align: center;">
            <h2 style="color: #000; font-weight: bold;">hyper mega red</h2>
            <p style="color:#FFFFFF; font-size:large;">Gracias por usar nuestro servicio.</p>
          </div>`,
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
      to: clientObj.email,
      subject: "actualizacion de estado✔",
      html: `se modifico el estado de su equipo ${service.product_model} a ${field}:${value}<br><br>
      <div style="background: linear-gradient(30deg, white, orange 50%, white , orange 50%, black 100%); padding: 20px; text-align: center;">
        <h2 style="color: #000;">hyper mega red</h2>
        <p style="color:#FFFFFF; font-size:large;">Gracias por usar nuestro servicio.</p>
      </div>`,
    });
    return service;
  } else if (
    (value !== true && field !== "final_diagnosis") ||
    (value !== true && field !== "technical_diagnosis")
  ) {
    return {
      error: true,
      response: `el valor debe ser true o false`,
    };
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
        include: [Service_status, Service_image],
      });
    })
  );
  return arrayOfServices;
};

const getServiceByIdController = async (id) => {
  const service = await Service.findByPk(id, {
    include: [Service_status, Service_image],
  });
  if (!service) {
    return {
      error: true,
      response: `service not found`,
    };
  }
  return service;
};
const getServiceByClientController = async (id) => {
  const Services = await Service.findAll({
    where: { userId: id },
    include: [Service_status, Service_image],
  });
  if (Services.length === 0) {
    return {
      error: true,
      response: `service not found`,
    };
  }
  return Services;
};

const getServiceByModelController = async (model) => {
  const Services = await Service.findAll({
    where: sequelize.where(
      sequelize.fn("lower", sequelize.col("product_model")),
      { [Op.like]: "%" + model.toLowerCase() + "%" }
    ),
  });
  if (Services.length === 0) {
    return {
      error: true,
      response: `service not found`,
    };
  }
  return Services;
};
const filterServicesByStatusController = async (status, value) => {
  const serviceStatuses = await Service_status.findAll();
  let arrayOfServices = [];
  for (let serviceStatus of serviceStatuses) {
    if (serviceStatus[status] === value) {
      const service = await Service.findByPk(serviceStatus.ServiceId, {
        include: [Service_status, Service_image],
      });
      arrayOfServices.push(service);
    }
  }
  if (arrayOfServices.length === 0) {
    return {
      error: true,
      response: `service not found`,
    };
  }
  return arrayOfServices;
};
module.exports = {
  addServiceController,
  updateServiceStatusController,
  getAllServicesController,
  getServiceByIdController,
  getServiceByClientController,
  getServiceByModelController,
  filterServicesByStatusController,
};
