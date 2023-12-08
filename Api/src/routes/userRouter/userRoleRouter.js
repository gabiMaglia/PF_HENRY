const { Router } = require("express");
const {
  getRolesHandler,
  createRolesHandler,
} = require("../../handlers/userHandlers/userHandlers");

const useRouter = Router();

useRouter.get("/", getRolesHandler);
useRouter.post("/create", createRolesHandler);

module.exports = useRouter;
