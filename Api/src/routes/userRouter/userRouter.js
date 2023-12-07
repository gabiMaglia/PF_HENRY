const { Router } = require("express");
const {
  getUsersHandler,
  getUsersByRoleHandler,
  getUserByIdHandler,
  postUserHandler,
  editUserByIdHandler,
  deleteUserHandler,
} = require("../../handlers/userHandlers");

const useRouter = Router();

useRouter.get("/", getUsersHandler);
useRouter.get("/:id", getUserByIdHandler);
useRouter.post("/", postUserHandler);
useRouter.put("/:id", editUserByIdHandler);
useRouter.delete("/:id", deleteUserHandler);
useRouter.get("/byRole/:role", getUsersByRoleHandler)

module.exports = useRouter;
