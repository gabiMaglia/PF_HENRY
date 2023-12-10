const { Router } = require("express");
const {
  addServiceHandler,
  updateServiceStatus,
  getAllServices,
  getServiceById,
  getServiceByClientid
} = require("../../handlers/serviceHandlers/ServiceHandlers");
const useRouter = Router();

useRouter.post("/", addServiceHandler);
useRouter.put('/:id',updateServiceStatus)
useRouter.get("/", getAllServices);
useRouter.get("/:id", getServiceById);
useRouter.get('/client/:id',getServiceByClientid)


module.exports = useRouter;
