const transporter = require("../../config/mailer");
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
          from: `Hyper Mega Red  ${destinationEmail}`,
          to: clientObj.email, // list of receivers
          subject: "ingreso a servicio ✔",
          html: `Estimado cliente.<br><br> se le informa que su equipo se ingreso a nuestro sistema el dia ${date}<br><br> ante cualquier duda comuniquese con nuestro sector de tecnicos<br><br>
          <img src='https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg'/>`,
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
  const options = [
    "technical_diagnosis",
    "final_diagnosis",
    "budget",
    "status",
    "confirm_repair",
  ];
  if (options.includes(field)) {
    serviceStatus[field] = value;
    await serviceStatus.save();
    const service = await Service.findOne({
      where: { id: serviceStatus.ServiceId },
      include: [Service_status],
    });
    const clientObj = await User.findByPk(service.userId);

    await transporter.sendMail({
      from: `Hyper Mega Red  ${destinationEmail}`, // sender address
      to: clientObj.email,
      subject: "actualizacion de estado✔",
      html: `Estimado cliente<br><br>se modifico el estado de su equipo ${service.product_model} a ${field}:${value}<br><br> ante cualquier duda comuniquese con nuestro sector de tecnicos<br><br>
      <img src='https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg'/>`,
    });
    return service;
  } else {
    return {
      error: true,
      response: `No existe esa propiedad del estado`,
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
  let Services = await Service.findAll({
    where: { userId: id },
    include: [Service_status, Service_image],
  });
  if (Services.length === 0) {
    Services = await Service.findAll({
      where: { technicianId: id },
      include: [Service_status, Service_image],
    });
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

const getFilterServiceController = async (status, user, technician) => {
  let conditionService = {};
  let conditionStatus = {};
  status && (conditionStatus.status = status);
  technician && (conditionService.technicianId = technician);
  user && (conditionService.userId = user);

  console.log(conditionService, conditionStatus);

  let arrayOfServices = [];

  arrayOfServices = await Service.findAll({
    where: conditionService,
    include: [
      {
        model: Service_status,
        where: conditionStatus,
      },
      Service_image,
    ],
  });

  return arrayOfServices;
};

const GetUndeletedServicesController=async()=>{
  const services=await Service.findAll({where:{isDelete:false}})
  if(services.length===0){
    return {
      error: true,
      response: `service not found`,
    };
  }
  return services
} 

module.exports = {
  addServiceController,
  updateServiceStatusController,
  getAllServicesController,
  getServiceByIdController,
  getServiceByClientController,
  getServiceByModelController,
  getFilterServiceController,
};
