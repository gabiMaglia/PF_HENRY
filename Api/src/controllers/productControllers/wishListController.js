const { WishList, User,Product } = require("../../db");

const getWishListController = async (id) => {
const List=await WishList.findOne({where:{UserId:id},include: [{ model: Product }]})
return List
};

const postwishItemController = async (userId, productId) => {
  const user = await User.findOne({ where: { id: userId }, include: WishList });
  if (!user) {
    return {
      error: true,
      response: 'Usuario no encontrado.',
    };
  }

  const product = await Product.findOne({ where: { id: productId } });
  if (!product) {
    return {
      error: true,
      response: 'Producto no encontrado.',
    };
  }

  if (user.WishList) {
    const products = await user.WishList.getProducts();
    const productExists = products.some(p => p.id === product.id);

    if (productExists) {
      await user.WishList.removeProduct(product);
    } else {
      await user.WishList.addProduct(product);
    }
    await user.WishList.save();

    const list = await user.getWishList({ include: [{ model: Product }] });
    return list;
  } else {
    const [wishList] = await WishList.findOrCreate({ where: { UserId: user.id } });
    await wishList.addProduct(product);
    const list = await user.getWishList({ include: [{ model: Product }] });
    return list;
  }
}

module.exports = { getWishListController,postwishItemController };