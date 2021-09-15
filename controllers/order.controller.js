import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";
import emailController from "../utils/emailController.js";

const orderController = {};

orderController.addToOrder = async (req, res, next) => {
  const { products, totalPrice } = req.body;
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
    if (!tempProduct) return res.status(404).send("Unable to locate product.");
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
};

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
