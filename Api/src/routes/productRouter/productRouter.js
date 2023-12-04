const { Router } = require("express");
const {
  postProductHandler,
  getProductsHandler,
  //   updateProductHandler,
  //   deleteProductHandler,
} = require("../../handlers/productHandlers");

const useRouter = Router();

useRouter.get("/", getProductsHandler);
useRouter.post("/", postProductHandler);
// useRouter.put("/:id", updateProductHandler);
// useRouter.delete("/:id", deleteProductHandler);

module.exports = useRouter;
