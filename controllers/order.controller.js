import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";
import emailController from "../utils/emailUtils.js";
import stringUtils from "../utils/stringUtils.js";
import moment from "moment";
const orderController = {};

orderController.addToOrder = async (req, res, next) => {
  const { products, totalPrice } = req.body;
  try {
    const owner = req.userId; //passed from middleware
    const orderedProducts = products.map((product) => {
      return {
        product: product.id,
        orderedQuantity: product.quantity,
        orderedSize: product.size,
        totalPrice: product.totalPrice,
      };
    });
    for (const product of orderedProducts) {
      const { orderedSize, orderedQuantity } = product;
      const tempProduct = await Product.findById(product.product);
      if (!tempProduct)
        return res.status(404).send("Unable to locate product.");
      const { size } = await tempProduct;
      if (orderedQuantity > size[orderedSize])
        return res
          .status(400)
          .send(tempProduct.name + " is out of stock. Please try again!");
    }
    // console.log(orderedProducts);
    const order = await Order.create({
      owner: owner,
      products: orderedProducts,
      totalPrice: totalPrice,
    });
    const emailOrder = await Order.findById(order)
      .populate({
        path: "products",
        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate("owner");
    await emailController.sendOrderConfirmation(
      emailOrder.owner.email,
      emailOrder
    );
    return res.status(200).send({
      order: order,
      message: "Order created successfully!",
    });
  } catch (err) {
    next(err);
  }
};

orderController.getOrders = async (req, res, next) => {
  let { page, limit, search, startDate, endDate } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  search = search || "";
  const offset = limit * (page - 1);

  if (startDate && endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    try {
      const orders = await Order.find({})
        .sort({ createdAt: -1 })
        .populate("owner")
        .populate({
          path: "products",
          populate: {
            path: "product",
            model: "Product",
          },
        });
      let filteredOrders = orders.filter((order) => {
        const target = moment(order.createdAt);
        if (
          target.isBetween(start, end, "days", "[]") &&
          order.products[0].product.name.includes(search)
        )
          return true;
        else return false;
      });
      const filteredTotal = filteredOrders.length;
      filteredOrders = filteredOrders.slice(offset, offset + limit);
      return res
        .status(200)
        .send({ orders: filteredOrders, totalOrders: filteredTotal });
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const totalOrders = await Order.find({}).count();
      const orders = await Order.find({})
        .sort({ createdAt: -1 })
        .populate("owner")
        .populate({
          path: "products",
          populate: {
            path: "product",
            model: "Product",
          },
        });
      let filteredOrders = orders.filter((order) =>
        order.products[0].product.name.includes(search)
      );
      const filteredTotal = filteredOrders.length;
      filteredOrders = filteredOrders.slice(offset, offset + limit);

      return res
        .status(200)
        .send({ orders: filteredOrders, totalOrders: filteredTotal });
    } catch (err) {
      next(err);
    }
  }
};
orderController.updateOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const status = stringUtils.capitalizeFirstLetter(req.query.status);
    if (status != "Completed" && status != "Pending" && status != "Cancelled")
      return res.status(400).send("Invalid query.");
    const order = await Order.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );
    if (!order)
      return res.status(404).send("Order not found. Please check again later.");
    return res.status(200).send({ order });
  } catch (err) {
    next(err);
  }
};
orderController.deleteOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await Order.findByIdAndDelete(id);

    return res.status(200).send({ order });
  } catch (err) {
    next(err);
  }
};
export default orderController;
