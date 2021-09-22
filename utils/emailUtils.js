import nodemailer from "nodemailer";
import mjml2html from "mjml";
import orderConfirmTemplate from "./emailTemplates/orderConfimation.js";
import orderPlacedTemplate from "./emailTemplates/orderPlaced.js";
import orderCancelledTemplate from "./emailTemplates/orderCancelled.js";
const emailController = {};
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

emailController.sendOrderConfirmation = async (email, order) => {
  try {
    const { products, totalPrice } = order;
    const mjml = orderConfirmTemplate(products, totalPrice);
    const htmlOutput = mjml2html(mjml);
    let info = await transporter.sendMail({
      from: "Chuong Nguyen <quyenchuong.nguyen@gmail.com>",
      to: email,
      subject: "Order confirmation from DSV Fashion",
      html: htmlOutput.html,
    });
    return info;
  } catch (err) {
    console.log(err);
  }
};
emailController.sendOrderPlacedConfirmation = async (order) => {
  try {
    const { products, totalPrice } = order;
    const mjml = orderPlacedTemplate(products, totalPrice);
    const htmlOutput = mjml2html(mjml);
    let info = await transporter.sendMail({
      from: "Chuong Nguyen <quyenchuong.nguyen@gmail.com>",
      to: "quyenchuong1998@gmail.com",
      subject: "Order placed from DSV Fashion",
      html: htmlOutput.html,
    });
    return info;
  } catch (err) {
    console.log(err);
  }
};

emailController.sendOrderCancelledConfirmation = async (order) => {
  try {
    const { products, totalPrice } = order;
    const mjml = orderCancelledTemplate(products, totalPrice);
    const htmlOutput = mjml2html(mjml);
    let info = await transporter.sendMail({
      from: "Chuong Nguyen <quyenchuong.nguyen@gmail.com>",
      to: "quyenchuong1998@gmail.com",
      subject: "Order cancelled from DSV Fashion",
      html: htmlOutput.html,
    });
    return info;
  } catch (err) {
    console.log(err);
  }
};
export default emailController;
