const { Router } = require("express");
const {
  getUserCredentialsHandler,
  editUserCredentialsHandler,
} = require("../../handlers/userHandlers/userHandlers");

const useRouter = Router();

useRouter.get("/:id", getUserCredentialsHandler);
useRouter.put("/:id", editUserCredentialsHandler);

module.exports = useRouter;
