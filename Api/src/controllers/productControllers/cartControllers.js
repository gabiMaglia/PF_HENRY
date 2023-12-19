const { Product, Cart, User, ProductCart } = require("../../db");

async function postCart(userId, productId, productQuantity, date, cartTotal) {
  try {
    const cart = await Cart.create({
      productQuantity,
      date,
      cartTotal,
      state: "inicializado",
      UserId: userId,
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

const addToCart = async (userId, productId, productQuantity, cartMoney) => {
  try {
    let cartToUpdate = await Cart.findOne({
      where: {
        UserId: userId,
      },
      include: [
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
    //cartToUpdate = {
    // 	"id": "358ba97d-78ac-4bf9-bdba-4147efd1340b",
    // 	"date": "2001-02-23T03:00:00.000Z",
    // 	"state": "inicializado",
    // 	"cartTotal": "333.00",
    // 	"createdAt": "2023-12-19T14:26:00.316Z",
    // 	"updatedAt": "2023-12-19T14:26:00.316Z",
    // 	"UserId": "34507c7e-8a68-46fe-9c09-f10ccc36b974",
    // 	"Products": [
    // 		{
    // 			"id": "1eb9a209-9845-4849-a9ac-fe224add6809",
    // 			"ProductCart": {
    // 				"quantity": 5
    // 			}
    // 		}
    // 	]
    // }
    if (cartToUpdate) {
      const existingProduct = cartToUpdate.Products.find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        existingProduct.ProductCart.quantity = productQuantity;
        await cartToUpdate.update({ cartTotal: cartMoney });
      } else {
        cartToUpdate.Products.push({
          id: productId,
          ProductCart: {
            quantity: productQuantity,
          },
        });
        await cartToUpdate.update({ cartTotal: cartMoney });
      }
      await cartToUpdate.save();

      return cartToUpdate;
    } else {
      return "El usuario no ha generado aun un carrito en la base de datos.";
    }
  } catch (error) {
    console.log(error);
  }
};

const getCartById = async (id) => {
  const cart = await Cart.findeByPk(id, {
    include: [
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

  if (!cart) {
    throw new Error("Cart not found");
  } else {
    return cart;
  }
};

module.exports = { postCart, addToCart, getAllCarts, getCartById };
