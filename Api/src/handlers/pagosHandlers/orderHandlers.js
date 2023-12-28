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
      .json({ message: "Order created successfully", Order: order });
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
      res.status(404).json({ message: "Orders not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOrderHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await deleteOrderById(id);
    res.status(200).json(`Order deleted successfully`);
  } catch (error) {
    if (error.message === "Order not found") {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
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
