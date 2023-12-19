const { WishList, User,Product } = require("../../db");

const getWishListController = async () => {
  const response = await WishList.findAll();
  console.log(response);
  console.log(response.length);
  if (response.length === 0) {
    return {
      error: true,
      response: `La lista de deseos está vacía.`,
    };
  }
  return response;
};

const postwishItemController=async(userId,productId)=>{ 
  const user = await User.findOne({ where: { id: userId }, include: WishList })
  if(!user){
    return {
      error: true,
      response: `Usuario no encontrado.`,
    };
  }
  const product = await Product.findOne({ where: { id: productId } });
  if(!product){
    return {
      error: true,
      response: `Producto no encontrado.`,
    };
  }
  await user.WishList.addProduct(product);
  const list=await WishList.findAll()
  return list
}

module.exports = { getWishListController,postwishItemController };