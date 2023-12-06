const { Router } = require("express");
const {
 editUserCredentialsHandler
} = require("../../handlers/userHandlers");

const useRouter = Router();

useRouter.put("/:id", editUserCredentialsHandler);


module.exports = useRouter;
