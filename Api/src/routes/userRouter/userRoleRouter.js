const { Router } = require("express");
const {
  getRolesHandler,
  createRolesHandler,
  getUsersByRoleHandler
} = require("../../handlers/userHandlers/userRoleHandler");
const {
  checkRoleAuthToken,
} = require("../../middlewares/tokenAuthMiddlewares");

const useRouter = Router();

useRouter.get("/", checkRoleAuthToken(['admin', 'tecnician', 'customer']), getRolesHandler);
useRouter.post("/create", checkRoleAuthToken(['admin']), createRolesHandler);
useRouter.get("/by_role/:role", checkRoleAuthToken(['admin', 'technician', 'customer']), getUsersByRoleHandler)

module.exports = useRouter;
