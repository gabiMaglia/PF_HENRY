const { Router } = require("express");
const {
  getUsersHandler,
  getUserByIdHandler,
  postUserHandler,
  editUserByIdHandler,
} = require("../../handlers/userHandlers/userHandlers");
const useRouter = Router();

useRouter.get("/", getUsersHandler);
useRouter.get("/:id", getUserByIdHandler);
useRouter.post("/", postUserHandler);
useRouter.put("/:id", editUserByIdHandler);

module.exports = useRouter;
