const { Router } = require("express");
const {getWishList}=require('../../handlers/productHandlers/wishListHandlers')

const useRouter = Router();

useRouter.get("/", getWishList);

module.exports = useRouter;
