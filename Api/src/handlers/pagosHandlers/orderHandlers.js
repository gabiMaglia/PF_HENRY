const {
  createOrder,
  getAllOrders,
  deleteOrderById,
  getMisCompras,
} = require("../../controllers/pagosControllers/ordersControllers");

const createOrderHandler = async (req, res) => {
  const {
    userId,
    shippingAddress,
    paymentMethod,
    totalAmount,
    trackingNumber,
    shippingDetails,
    customerNotes,
    array,
  } = req.body;

  try {
    const order = await createOrder(
      userId,
      shippingAddress,
      paymentMethod,
      totalAmount,
      trackingNumber,
      shippingDetails,
      customerNotes,
      array
    );

    res
      .status(200)
      .json({ message: "La orden se ha creado correctamente", Order: order });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrdersHandler = async (req, res) => {
  try {
    const orders = await getAllOrders();

    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "No hay ordenes que mostrar" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteOrderHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await deleteOrderById(id);
    res.status(200).json(`La orden se ha eliminado con éxito`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const misComprasHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const misCompras = await getMisCompras(id);
    if (misCompras) {
      res.status(200).json(misCompras);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createOrderHandler,
  getAllOrdersHandler,
  misComprasHandler,
  deleteOrderHandler,
};
