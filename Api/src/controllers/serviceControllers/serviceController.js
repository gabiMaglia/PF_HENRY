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
const hypermegared = "https://pf-henry-sepia.vercel.app/";

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
    const clientName = `${clientObj.name} ${clientObj.surname}`;
    const clientEmail = clientObj.email;
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
        createdService.dataValues.clientName = `${clientObj.name} ${clientObj.surname}`;
        createdService.dataValues.clientEmail = clientObj.email;
        createdService.dataValues.technicianName = `${technicianObj.name} ${technicianObj.surname}`;

        const date = new Date(newService.createdAt).toISOString().split("T")[0];
        //envio del mail
        if (clientObj.communication_preference !== "Whatsapp") {
          await transporter.sendMail({
            from: `Hyper Mega Red  ${destinationEmail}`,
            to: clientObj.email, // list of receivers
            subject: `ingreso a servicio ${newService.product_model}`,
            html: `<div
            style="
             background: linear-gradient(to top, #fd611a, white);
             width: 100%;
             max-width: 600px;
             filter: brightness(80%);
             height: auto;
             border-radius: 20px;
            "
            >
            <table
              style="
              width: 100%;
              max-width: 500px;
              height: auto;
              background: linear-gradient(to bottom, black, white);
              margin: 2px auto;
              border: solid 1px white;
              align-items: center;
              "
            >
              <tr>
                <td>
                  <a href="https://pf-henry-sepia.vercel.app/">
                  <img src="https://res.cloudinary.com/hypermegared/image/upload/v1704925814/jwnogqatk0b1jdmpfrzz.png" alt="logo" style="width: 100px;height: 100px; margin: 0 200px 0 200px ;">
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <p
                    style="
                      font-size: 15px;
                      text-align: center;
                      margin: 15px 50px 0 50px;
                      color: white;
                      font-weight: bold;
                    "
                  >
                  Estimado ${clientName}
                  </p>
                </td>
              </tr>
      
              <tr>
                <td>
                  <p
                    style="
                      font-size: 20px;
                      text-align: center;
                      color: rgb(255, 255, 255);
                      font-weight: bolder;
                      margin: 15px 50px 0px 50px;
                      text-shadow: 0.5px 0px 0px #fd611a,
                        0px 0.5px 0px #fd611a, -0.5px 0px 0px #fd611a,
                        0px -0.5px 0px #fd611a;
                    "
                  >
                  Le informamos que su equipo <b>${newService.product_model}</b> se ingreso a nuestro sistema el dia ${date}.<br> El mismo será evaluado por el técnico asignado para el servicio.<br> Una vez evaluado, recibirá por este medio el diagnóstico del mismo y el presupuesto para su reparación.<br> También podrá seguir el estado del servicio desde nuestro <a href="${hypermegared}">Sitio Web</a> ingresando a su panel de usuario, productos en servicio.<br> Ahí podrá ACEPTAR o RECHAZAR el presupuesto.<br> Ante cualquier duda no dude en comunicarse con nuestro sector de soporte técnico. Muchas gracias....
      
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="https://pf-henry-sepia.vercel.app/">
                    <img
                      src="https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg"
                      style="
                        display: block;
                        max-width: 500px;
                        margin-top: 5px;
                      "
                    />
                  </a>
                </td>
              </tr>
            </table>
            </div>`,
          });
        }
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
    const clientName = `${clientObj.name} ${clientObj.surname}`;
    if (clientObj.communication_preference !== "Whatsapp") {
      await transporter.sendMail({
        from: `Hyper Mega Red  ${destinationEmail}`, // sender address
        to: clientObj.email,
        subject: `actualizacion de estado de reparacion ${service.product_model}` ,
        html: `<div
        style="
          background: linear-gradient(to top, #fd611a, white);
          width: 100%;
          max-width: 600px;
          filter: brightness(80%);
          height: auto;
          border-radius: 20px;
        "
      >
        <table
          style="
            width: 100%;
            max-width: 500px;
            height: auto;
            background: linear-gradient(to bottom, black, white);
            margin: 2px auto;
            border: solid 1px white;
            align-items: center;
          "
        >
          <tr>
            <td>
              <a href="https://pf-henry-sepia.vercel.app/">
                <img
                  src="https://res.cloudinary.com/hypermegared/image/upload/v1704925814/jwnogqatk0b1jdmpfrzz.png"
                  alt="logo"
                  style="width: 100px; height: 100px; margin: 0 200px 0 200px"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <p
                style="
                  font-size: 15px;
                  text-align: center;
                  margin: 15px 50px 0 50px;
                  color: white;
                  font-weight: bold;
                "
              >
                Estimado ${clientName}
              </p>
            </td>
          </tr>
      
          <tr>
            <td>
              <p
                style="
                  font-size: 20px;
                  text-align: center;
                  color: rgb(255, 255, 255);
                  font-weight: bolder;
                  margin: 15px 50px 0px 50px;
                  text-shadow: 0.5px 0px 0px #fd611a, 0px 0.5px 0px #fd611a,
                    -0.5px 0px 0px #fd611a, 0px -0.5px 0px #fd611a;
                "
              >
                Le informamos que se modificó el estado de su equipo
                ${service.product_model} a ${field}: "${value}".
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p
                style="
                  font-size: 20px;
                  text-align: center;
                  color: rgb(255, 255, 255);
                  font-weight: bolder;
                  margin: 15px 50px 0px 50px;
                  text-shadow: 0.5px 0px 0px #fd611a, 0px 0.5px 0px #fd611a,
                    -0.5px 0px 0px #fd611a, 0px -0.5px 0px #fd611a;
                "
              >
                Recuerde que también puede seguir el estado del mismo desde nuestro
                <a href="${hypermegared}">Sitio Web</a> ingresando a su panel de
                usuario, productos en servicio.<br />
                Ante cualquier duda no dude en comunicarse con nuestro sector de
                soporte técnico. Muchas gracias....
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://pf-henry-sepia.vercel.app/">
                <img
                  src="https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg"
                  style="display: block; max-width: 500px; margin-top: 5px"
                />
              </a>
            </td>
          </tr>
        </table>
      </div>
      `,
      });
    }
    return `${field} actualizado a ${value}`;
  } else {
    return {
      error: true,
      response: `No existe esa propiedad del estado`,
    };
  }
};

//ALL SERVICES
const getAllServicesController = async () => {
  const services = await Service.findAll();
  if (services.length === 0) {
    return [];
  }
  const arrayOfServices = await Promise.all(
    services.map(async (service) => {
      const clientObj = await User.findByPk(service.userId);
      const technicianObj = await User.findByPk(service.technicianId);

      const clientName = clientObj
        ? `${clientObj.name} ${clientObj.surname}`
        : null;
      const clientEmail = clientObj ? clientObj.email : null;
      const technicianName = technicianObj
        ? `${technicianObj.name} ${technicianObj.surname}`
        : null;

      const serviceWithNames = await Service.findByPk(service.id, {
        include: [Service_status, Service_image],
      });

      if (serviceWithNames) {
        serviceWithNames.dataValues.clientName = clientName;
        serviceWithNames.dataValues.clientEmail = clientEmail;
        serviceWithNames.dataValues.technicianName = technicianName;
      }
      return serviceWithNames;
    })
  );
  return arrayOfServices;
};

//SERVICE BY ID
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

//CLIENT SERVICE
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

//MODEL SERVICE
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

//FILTER SERVICE
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

//UNDELETE SERVICE
const GetUndeletedServicesController = async () => {
  const services = await Service.findAll({ where: { isDelete: false } });
  if (services.length === 0) {
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
};

//DELETE SERVICE
const DeleteServiceController = async (id) => {
  const service = await Service.findByPk(id);
  if (!service) {
    return {
      error: true,
      response: `service not found`,
    };
  }
  service.isDelete = !service.isDelete;
  service.save();
  return service;
};

//UPDATE SERVICE
const updateServiceController = async (
  id,
  product_model,
  user_diagnosis,
  technicianId,
  budget,
  confirm_repair,
  status,
  technical_diagnosis,
  final_diagnosis
) => {
  const service = await Service.findByPk(id, {
    include: [Service_status],
  });
  if (!service) {
    return {
      error: true,
      response: "Service not found",
    };
  }
  product_model && (service.product_model = product_model);
  const serviceStatus = service.Service_status;
  if (serviceStatus) {
    user_diagnosis && (serviceStatus.user_diagnosis = user_diagnosis);
    budget && (serviceStatus.budget = budget);
    confirm_repair && (serviceStatus.confirm_repair = confirm_repair);
    status && (serviceStatus.status = status);
    technical_diagnosis &&
      (serviceStatus.technical_diagnosis = technical_diagnosis);
    final_diagnosis && (serviceStatus.final_diagnosis = final_diagnosis);

    await serviceStatus.save();
  }
  if (technicianId) {
    const technicianObj = await User.findByPk(technicianId);
    if (!technicianObj) {
      return {
        error: true,
        response: "Technician not found",
      };
    }
    await service.setTechnician(technicianObj);
  }
  await service.save();
  return service;
};

//LOGICAL DELETE SERVICE
const logicalDeleteServiceController = async (id) => {
  if (!id) {
    return { error: true, response: "El id es requerido" };
  }
  const service = await Service.findByPk(id);
  if (!service) {
    return { error: true, response: "Servicio no encontrado" };
  }
  await service.update({ isDelete: !service.isDelete });
  return `Servicio ${service.product_model} ${
    service.isDelete ? " desactivado" : " activado"
  } `;
};

module.exports = {
  addServiceController,
  updateServiceStatusController,
  getAllServicesController,
  getServiceByIdController,
  getServiceByClientController,
  getServiceByModelController,
  getFilterServiceController,
  DeleteServiceController,
  GetUndeletedServicesController,
  updateServiceController,
  logicalDeleteServiceController,
};
