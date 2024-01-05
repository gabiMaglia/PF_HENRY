const { Product, Cart, User, ProductCart, ProductImage } = require("../../db");

async function postCart(userId, productId, productQuantity) {
  try {
    let cart = await Cart.findOne({
      where: {
        UserId: userId,
      },
    });

    if (cart) {
      return "El usuario ya tiene carrito";
    } else {
      const currentDate = new Date();
      let cart = await Cart.create({
        productQuantity,
        currentDate,
        state: "inicializado",
      });

      if (userId) {
        const user = await User.findByPk(userId);
        if (!user) {
          console.log("Usuario no encontrado");
        }
        await user.setCart(cart);
      }

      const product = await Product.findByPk(productId);

      await cart.addProduct(product, {
        through: { quantity: productQuantity },
      });
      cart.cartTotal = product.price * productQuantity;
      return cart;
    }
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
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
        await ProductCart.update(
          {
            quantity:
              existingProduct.ProductCart.quantity + Number(productQuantity),
          },
          { where: { CartId: cartToUpdate.id, ProductId: productId } }
        );
        // existingProduct.ProductCart.quantity += Number(productQuantity);
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

const removeFromCart = async (userId, productId, cartMoney) => {
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

    if (cartToUpdate) {
      const existingProduct = cartToUpdate.Products.find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        await cartToUpdate.removeProduct(existingProduct);
        console.log("Producto eliminado del carrito");
      } else {
        console.log("El producto no existe en el carrito");
      }

      await cartToUpdate.update({ cartTotal: cartMoney });

      // Volver a buscar el carrito actualizado
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
    console.error(error);
  }
};

const getCartById = async (userId) => {
  const cart = await Cart.findOne({
    where: { UserId: userId },
    include: [
      {
        model: Product,
        attributes: ["id", "name", "price"],
        through: {
          model: ProductCart,
          attributes: ["quantity"],
        },
        include: [
          {
            model: ProductImage,
            attributes: ["address"],
          },
        ],
      },
    ],
  });

  if (!cart) {
    console.log("Cart not found");
  } else {
    return cart;
  }
};

const deleteCartById = async (userId) => {
  try {
    const cartToDelete = await Cart.findOne({
      where: {
        UserId: userId,
      },
    });

    if (cartToDelete) {
      await cartToDelete.destroy();
      return { cartToDelete, deleted: true };
    } else {
      return { deleted: false, message: "Carrito no encontrado" };
    }
  } catch (error) {
    console.log(error);
    return { deleted: false, error: error.message };
  }
};

const editQuantity = async (userId, productId, productQuantity, cartMoney) => {
  try {
    const cartToUpdate = await Cart.findOne({
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
    if (cartToUpdate) {
      const existingProduct = cartToUpdate.Products.find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        await ProductCart.update(
          {
            quantity: (existingProduct.ProductCart.quantity =
              Number(productQuantity)),
          },
          { where: { CartId: cartToUpdate.id, ProductId: productId } }
        );
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

module.exports = {
  postCart,
  addToCart,
  getAllCarts,
  getCartById,
  deleteCartById,
  removeFromCart,
  editQuantity,
};
