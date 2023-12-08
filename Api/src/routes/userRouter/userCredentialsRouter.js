const { Router } = require("express");
const {
  getUserCredentialsHandler,
  editUserCredentialsHandler,
} = require("../../handlers/userHandlers/userCredentialsHandler");

const useRouter = Router();

useRouter.get("/:id", getUserCredentialsHandler);
useRouter.put("/:id", editUserCredentialsHandler);

module.exports = useRouter;
