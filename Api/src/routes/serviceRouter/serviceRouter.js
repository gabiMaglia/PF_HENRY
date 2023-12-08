const { Router } = require("express");
const {
  addServiceHandler,
  updateRepairFinish,
  updateConfirmRepair,
  UpdateFinalDiagnosis,
  UpdateTechDiagnosis,
  getAllServices,
} = require("../../handlers/ServiceHandlers");
const useRouter = Router();

useRouter.post("/add",addServiceHandler);
useRouter.put("/updateTech/:id",UpdateTechDiagnosis);
useRouter.put('/updateFinal/:id',UpdateFinalDiagnosis);
useRouter.put('/confirm/:id',updateConfirmRepair);
useRouter.put('/finish/:id',updateRepairFinish);
useRouter.get('/',getAllServices)

module.exports=useRouter