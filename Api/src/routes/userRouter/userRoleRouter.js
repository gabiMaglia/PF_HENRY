const { Router } = require("express");
const {
  getRolesHandler,
  createRolesHandler,
  getUsersByRoleHandler
} = require("../../handlers/userHandlers/userRoleHandler");

const useRouter = Router();

useRouter.get("/", getRolesHandler);
useRouter.post("/create", createRolesHandler);
useRouter.get("/by_role/:role", getUsersByRoleHandler)

module.exports = useRouter;
