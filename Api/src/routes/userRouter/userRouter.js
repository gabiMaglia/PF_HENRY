const { Router } = require("express");
const {
  getUsersHandler,
  getUserByIdHandler,
  postUserHandler,
  editUserByIdHandler,
  deleteUserHandler,
} = require("../../handlers/userHandlers/userHandlers");

const useRouter = Router();

useRouter.get("/", getUsersHandler);
useRouter.get("/:id", getUserByIdHandler);
useRouter.post("/", postUserHandler);
useRouter.put("/:id", editUserByIdHandler);
useRouter.delete("/:id", deleteUserHandler);



module.exports = useRouter;
