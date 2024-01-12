const { Router } = require("express");
const {
  addServiceHandler,
  updateServiceStatus,
  getAllServices,
  getServiceById,
  getServiceByClientid,
  getFilterService,
  getUndeletedService,
  deleteService,
  updateService,
  logicalDelete
} = require("../../handlers/serviceHandlers/ServiceHandlers");
const useRouter = Router();

useRouter.post("/", addServiceHandler);
useRouter.get("/undeleted", getUndeletedService)
useRouter.put("/delete/:id", deleteService)
useRouter.put("/:id", updateServiceStatus);
useRouter.put("/update/service/:id", updateService);
useRouter.put("/logicalDelete/service/:id", logicalDelete);
useRouter.get("/", getAllServices);
useRouter.get("/filter", getFilterService);
useRouter.get("/client/:id", getServiceByClientid);
useRouter.get("/:id", getServiceById);

module.exports = useRouter;
