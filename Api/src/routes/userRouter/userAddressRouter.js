const { Router } = require("express");
const {
 editUserAddressHandler
} = require("../../handlers/userHandlers");

const useRouter = Router();

useRouter.put("/:id", editUserAddressHandler);


module.exports = useRouter;
