const { Product, Cart, User, ProductCart } = require("../../db");

async function postCart(userId, productId, productQuantity, date, cartMoney) {
  try {
    const cart = await Cart.create({
      productQuantity,
      date,
      cartTotal: cartMoney,
      state: "inicializado",
    });

    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      await user.setCart(cart);
    }

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
        {
          model: User,
          attributes: ["id"],
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
      } else {
        const product = await Product.findByPk(productId);
        const addProductResult = await cartToUpdate.addProduct(product, {
          through: { quantity: productQuantity },
        });
        console.log("Resultado de agregar producto:", addProductResult);
      }

      await cartToUpdate.update({ cartTotal: cartMoney });

      //vuelve a pedir el carrito para que devuelva el carrito actualizado
      const updatedCart = await Cart.findOne({
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
      return updatedCart;
    } else {
      return "El usuario no ha generado aun un carrito en la base de datos.";
    }
  } catch (error) {
    console.log(error);
  }
};

const getCartById = async (id) => {
  const cart = await Cart.findByPk(id, {
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

const deleteCartById = async (id) => {
  try {
    const cartToDelete = await Cart.findByPk(id);

    await cartToDelete.destroy();
    return { cartToDelete, deleted: true };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  postCart,
  addToCart,
  getAllCarts,
  getCartById,
  deleteCartById,
};
