import nodemailer from "nodemailer";
import mjml2html from "mjml";
import orderConfirmTemplate from "./emailTemplates/orderConfimation.js";
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
export default emailController;
