const { Service, Service_status, User, UserRole } = require("../../db");

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

        return createdService;
      } else {
        return {
          error: true,
          response: `There is no technician with that ID`,
        }
      }
    } else {
      return {
        error: true,
        response: `There is no customer with that ID`,
      }
    }
  }
};
const updateServiceStatusController = async (id, field, value) => {
  const serviceStatus = await Service_status.findOne({ where: { id } });
  if (!serviceStatus) {
    return {
      error: true,
      response: `status not found`,
    }
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
    return service;
  } else {
    return {
      error: true,
      response: `no se modifico el status`,
    }
  }
};

const getAllServicesController = async () => {
  const services = await Service.findAll();
  console.log(services);
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
    }
  }
  return service;
};
module.exports = {
  addServiceController,
  updateServiceStatusController,
  getAllServicesController,
  getServiceByIdController,
};
