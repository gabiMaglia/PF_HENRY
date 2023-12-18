const { Product, Cart, User, ProductCart } = require("../../db");

async function addToCartController(
  userId,
  productId,
  productQuantity,
  date,
  cartTotal
) {
  try {
    const cart = await Cart.create({
      productQuantity,
      date,
      cartTotal,
      state: "inicializado",
    });

    const user = await User.findByPk(userId);
    await user.setCart(cart);

    const product = await Product.findByPk(productId);

    await cart.addProduct(product, { through: { quantity: productQuantity } });

    return cart;
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
    throw new Error("Error al agregar el producto al carrito");
  }
}

const getAllCarts = async () => {
  try {
    const allCarts = await Cart.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
        },
        {
          model: Product,
          attributes: ["id"],
          through: {
            model: ProductCart,
            attributes: ["quantity"],
          },
        },
      ],
    });

    return allCarts;
  } catch (error) {
    console.log(error.message);
    throw new Error({ error: error.message });
  }
};

const updateCartController = async (userId, productArray) => {
  //   let cart = await Cart.findOne({
  //     where: { userId },
  //     include: [{ model: Product }],
  //   });

  //lo sque del add cart
  let cart = await Cart.findOne({
    where: { userId },
    attributes: ["id"],
    include: [
      {
        model: Product,
        attributes: ["id"],
      },
      {
        model: User,
        attributes: ["id"],
      },
    ],
  });
  //jejejeje

  if (!cart) {
    return res.status(404).json({ error: "El usuario no tiene un carrito" });
  }

  await cart.setProducts([]);

  for (const productData of productArray) {
    const { productId, quantity } = productData;
    const product = await Product.findByPk(productId);
    await cart.addProduct(product, { through: { quantity } });
  }

  await cart.update({
    cartTotal: calculateCartTotal(cart.Products),
  });

  cart = await Cart.findOne({
    where: { userId },
    include: [{ model: Product }],
  });

  return cart;
};

function calculateCartTotal(products) {
  return products.reduce((total, product) => {
    return total + product.price * product.CartProduct.quantity;
  }, 0);
}

module.exports = { addToCartController, updateCartController, getAllCarts };
