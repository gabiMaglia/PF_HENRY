const { Service, Service_status,User,UserRole } = require("../db");

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
    const newService = await Service.create({
      product_model,
      product_income_date,
    });

    const clientObj = await User.findByPk(ClientId);
    const technicianObj = await User.findByPk(technicianId);
    if( !clientObj && !technicianObj ){
     throw new Error('id no valido')
  
    }
    const rolTech=await UserRole.findByPk(technicianObj.rolId)
    const rolCust=await UserRole.findByPk(clientObj.rolId)
    if (rolCust.role_name==="customer") {
      await newService.setTechnician(clientObj);
    }else{
      throw new Error('There is no customer with that ID')
    }
    if (rolTech.role_name==="technician") {
      await newService.setTechnician(technicianObj);
    }else{
      throw new Error('There is no technician with that ID')
    }

    
  
    const newServiceStatus = await Service_status.create({
      user_diagnosis,
      technical_diagnosis: "pending",
      final_diagnosis: "pending",
      confirm_repair: false,
      reparir_finish: false,
      ServiceId: newService.id,
    });
    const createdService = await Service.findByPk(newService.id, {
      include: [Service_status]
    });

    return createdService;
};
}
const UpdateTechDiagnosisController = async (id, technical_diagnosis) => {
  const serviceStatus = await Service_status.findOne({
    where: { id },
  });
  if (!serviceStatus) {
    throw new Error("status not found");
  }
  serviceStatus.technical_diagnosis = technical_diagnosis;
  await serviceStatus.save();

  const service = await Service.findOne({
    where: { id: serviceStatus.ServiceId },
    include: [Service_status],
  });

  return service;
};
const UpdateFinalDiagnosisController = async (id, final_diagnosis) => {
  const serviceStatus = await Service_status.findOne({
    where: { id },
  });
  if (!serviceStatus) {
    throw new Error("status not found");
  }
  serviceStatus.final_diagnosis = final_diagnosis;
  await serviceStatus.save();

  const service = await Service.findOne({
    where: { id: serviceStatus.ServiceId },
    include: [Service_status],
  });

  return service;
};
const updateConfirmRepairController = async (id, confirm_repair) => {
  const serviceStatus = await Service_status.findOne({ where: { id } });
  if (!serviceStatus) {
    throw new Error("status not found");
  }
  if (confirm_repair === true) {
    serviceStatus.confirm_repair === confirm_repair;
    await serviceStatus.save();
    const service = await Service.findOne({
      where: { id: serviceStatus.ServiceId },
      include: [Service_status],
    });
    return service;
  } else {
    throw new Error("no se modifico el status");
  }
};
const updateRepairFinishController = async (id, reparir_finish) => {
  const serviceStatus = await Service_status.findOne({ where: { id } });
  if (!serviceStatus) {
    throw new Error("status not found");
  }
  if (reparir_finish === true) {
    serviceStatus.reparir_finish === reparir_finish;
    await serviceStatus.save();
    const service = await Service.findOne({
      where: { id: serviceStatus.ServiceId },
      include: [Service_status],
    });
    return service;
  } else {
    throw new Error("no se modifico el status");
  }
};


const getAllServicesController = async () => {
  const services = await Service.findAll();
  if(services.length === 0){
    throw new Error('services not found')
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

module.exports={
  addServiceController,
  UpdateTechDiagnosisController,
  UpdateFinalDiagnosisController,
  updateConfirmRepairController,
  updateRepairFinishController,
  getAllServicesController
}