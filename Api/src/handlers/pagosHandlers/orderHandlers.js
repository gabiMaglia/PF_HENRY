const {
  createOrder,
  getAllOrders,
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
  } = req.body;

  try {
    const order = await createOrder(
      userId,
      shippingAddress,
      paymentMethod,
      totalAmount,
      trackingNumber,
      shippingDetails,
      customerNotes
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
      res.status(400).json({ message: "Orders not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrderHandler,
  getAllOrdersHandler,
};
