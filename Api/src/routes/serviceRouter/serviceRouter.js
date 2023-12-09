const { Router } = require("express");
const {
  addServiceHandler,
  updateServiceStatus,
  getAllServices,
  getServiceById,
} = require("../../handlers/serviceHandlers/ServiceHandlers");
const useRouter = Router();

useRouter.post("/", addServiceHandler);
useRouter.put('/:id',updateServiceStatus)
useRouter.get("/", getAllServices);
useRouter.get("/:id", getServiceById);


module.exports = useRouter;
