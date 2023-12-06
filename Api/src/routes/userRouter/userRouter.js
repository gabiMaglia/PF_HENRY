const { Router } = require("express");
const {
  getUsersHandler,
  getUserByIdHandler,
  postUserHandler,
  editUserHandler,
  deleteUserHandler,
} = require("../../handlers/userHandlers");

const useRouter = Router();

useRouter.get("/", getUsersHandler);
useRouter.get("/:id", getUserByIdHandler);
useRouter.post("/", postUserHandler);
useRouter.put("/:id", editUserHandler);
useRouter.delete("/:id", deleteUserHandler);

module.exports = useRouter;
