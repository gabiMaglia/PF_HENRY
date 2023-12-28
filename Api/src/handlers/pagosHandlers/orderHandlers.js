const {
  createOrder,
  getAllOrders,
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
};
