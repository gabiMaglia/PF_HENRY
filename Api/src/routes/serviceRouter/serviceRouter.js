const { Router } = require("express");
const {
  addServiceHandler,
  updateServiceStatus,
  getAllServices,
  getServiceById,
  getServiceByClientid,
  filterServiceByStatus,
} = require("../../handlers/serviceHandlers/ServiceHandlers");
const useRouter = Router();

useRouter.post("/", addServiceHandler);
useRouter.put("/:id", updateServiceStatus);
useRouter.get("/", getAllServices);
useRouter.get("/filter", filterServiceByStatus);
useRouter.get("/client/:id", getServiceByClientid);
useRouter.get("/:id", getServiceById);

module.exports = useRouter;
