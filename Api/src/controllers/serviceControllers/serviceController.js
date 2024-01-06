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
const hypermegared = "https://pf-henry-sepia.vercel.app/"

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
    const clientName = clientObj.name;
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
          html: `Estimado ${clientName}.<br> Le informamos que su equipo se ingreso a nuestro sistema el dia ${date}.<br> El mismo será evaluado por el técnico asignado para el servicio.<br> Una vez evaluado, recibirá por este medio el diagnóstico del mismo y el presupuesto para su reparación.<br> También podrá seguir el estado del servicio desde nuestro <a href="${hypermegared}">Sitio Web</a> ingresando a su panel de usuario, productos en servicio.<br> Ahí podrá ACEPTAR o RECHAZAR el presupuesto.<br> Ante cualquier duda no dude en comunicarse con nuestro sector de soporte técnico. Muchas gracias....<br><br> 
          <img src='https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg'/>`,
        });

        //corta envio
        return createdService;
      } else {
        return {
          error: true,
          response: `No hay ningún técnico con ese ID`,
        };
      }
    } else {
      return {
        error: true,
        response: `No hay ningún usuario con ese ID`,
      };
    }
  }
};
const updateServiceStatusController = async (id, field, value) => {
  const serviceStatus = await Service_status.findOne({ where: { id } });
  if (!serviceStatus) {
    return {
      error: true,
      response: `No se encontro el servicio`,
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
      subject: "actualizacion de estado ✔",
      html: `Estimado ${clientName}<br> Le informamos que se modificó el estado de su equipo ${service.product_model} a ${field}: ${value}.<br> Recuerde que también puede seguir el estado del mismo desde nuestro <a href="${hypermegared}">Sitio Web</a> ingresando a su panel de usuario, productos en servicio.<br> Ante cualquier duda no dude en comunicarse con nuestro sector de soporte técnico. Muchas gracias....<br><br> >
      <img src='https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg'/>`,
    });
    return `${field} actualizado a ${value}`;
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
      response: `services not found`,
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
} 

const DeleteServiceController=async(id)=>{
  const service=await Service.findByPk(id)
  if(!service){
    return {
      error: true,
      response: `service not found`,
    };
  }
  service.isDelete=!service.isDelete
  service.save()
  return service
}

module.exports = {
  addServiceController,
  updateServiceStatusController,
  getAllServicesController,
  getServiceByIdController,
  getServiceByClientController,
  getServiceByModelController,
  getFilterServiceController,
  DeleteServiceController,
  GetUndeletedServicesController
};
