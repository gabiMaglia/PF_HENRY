const {
  WishList,
  User,
  Product,
  ProductCategory,
  ProductImage,
  ProductStock,
  ProductBrand,
} = require("../../db");

const getWishListController = async (id) => {
  const [List, created] = await WishList.findOrCreate({
    where: { UserId: id },
    include: [
      {
        model: Product,
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductCategory, attributes: ["name"] },
          { model: ProductImage, attributes: ["address"] },
          { model: ProductStock, attributes: ["amount"] },
        ],
      },
    ],
  });
  return List;
};

const postwishItemController = async (userId, productId) => {
  const user = await User.findOne({ where: { id: userId }, include: WishList });
  if (!user) {
    return {
      error: true,
      response: "Usuario no encontrado.",
    };
  }

  const product = await Product.findOne({ where: { id: productId } });
  if (!product) {
    return {
      error: true,
      response: "Producto no encontrado.",
    };
  }

  if (user.WishList) {
    const products = await user.WishList.getProducts();
    const productExists = products.some((p) => p.id === product.id);

    if (productExists) {
      await user.WishList.removeProduct(product);
    } else {
      await user.WishList.addProduct(product);
    }
    await user.WishList.save();

    const list = await user.getWishList({ include: [{ model: Product }] });
    return list;
  } else {
    const [wishList] = await WishList.findOrCreate({
      where: { UserId: user.id },
    });
    await wishList.addProduct(product);
    const list = await user.getWishList({ include: [{ model: Product }] });
    return list;
  }
};

const getOfferNotification = async (id) => {
  if (!id) {
    return { error: true, response: "No se encontro el usuario" };
  }
  const [list, created] = await WishList.findOrCreate({
    where: { UserId: id },
    include: [
      {
        model: Product,
      },
    ],
  });
  if (!list?.Products) {
    return { error: true, response: "No se encontro lista de usuarios" };
  }
  const productsInOffer = list.Products.filter((product) => {
    if (product.carousel) {
      return product;
    }
  });
  return productsInOffer;
};

module.exports = {
  getWishListController,
  postwishItemController,
  getOfferNotification,
};
