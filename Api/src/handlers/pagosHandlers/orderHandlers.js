const {
  createOrder,
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

module.exports = {
  createOrderHandler,
};
