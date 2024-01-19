const { Router } = require("express");
const {
  getUsersHandler,
  getUserByIdHandler,
  postUserHandler,
  editUserByIdHandler,
  logicalDeleteHandler
} = require("../../handlers/userHandlers/userHandlers");

const {
  checkAuthToken,
  checkRoleAuthToken,
} = require("../../middlewares/tokenAuthMiddlewares");

const useRouter = Router();

useRouter.get("/", getUsersHandler);
useRouter.get("/:id", getUserByIdHandler);
useRouter.post("/", postUserHandler);
useRouter.put("/:id", editUserByIdHandler);
useRouter.put("/logicalDelete/:id", checkAuthToken, checkRoleAuthToken(["admin"]), logicalDeleteHandler);

module.exports = useRouter;
