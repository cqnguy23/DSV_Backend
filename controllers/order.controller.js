import Order from "../models/Order.model.js";

const orderController = {};

orderController.addToOrder = async (req, res, next) => {};

orderController.getOrder = async (req, res, next) => {
  const orders = await Order.find({}).populate("owner").populate("product");

  return res.status(200).send({ orders: orders, totalOrders: orders.length });
};
orderController.updateOrder = async (req, res, next) => {};
orderController.deleteOrder = async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findByIdAndDelete(id);

  return res.status(200).send({ order });
};
export default orderController;
