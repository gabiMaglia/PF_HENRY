const { Router } = require("express");
const {
  getUsersHandler,
  getRolesHandler,
  getUserByIdHandler,
  postUserHandler,
  createRolesHandler,
  editUserHandler,
  deleteUserHandler,
} = require("../../handlers/userHandlers");

const useRouter = Router();

useRouter.get("/", getUsersHandler);
useRouter.get("/roles", getRolesHandler);
useRouter.get("/:id", getUserByIdHandler);
useRouter.post("/", postUserHandler);
useRouter.post("/newrole", createRolesHandler);
useRouter.put("/:id", editUserHandler);
useRouter.delete("/:id", deleteUserHandler);

module.exports = useRouter;
