import jsdom from "jsdom";
import Product from "../models/Product.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import env from "dotenv";
import User from "../models/user.model.js";
env.config();
const { JSDOM } = jsdom;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
let productsArray = [];
const MONGODB_URI = process.env.MONGODB_URI;
const sizeArray = ["s", "m", "l"];
const webScraper = async () => {
  const resp = await fetch(
    "https://www.edgeclothing.com.au/collections/shop-all-women"
  );
  const text = await resp.text();
  const dom = await new JSDOM(text);
  let imgArray = [];
  let titleArray = [];
  let priceArray = [];
  let img = dom.window.document.getElementsByClassName("imgcontain");
  let info = dom.window.document.getElementsByClassName("info");

  for (let i = 0; i < img.length; i++) {
    imgArray.push("https:" + img[i].querySelector("img").src);
  }
  for (let i = 0; i < info.length; i++) {
    titleArray.push(info[i].querySelector("a").title);
    let price = info[i]
      .getElementsByClassName("money")[1]
      .innerHTML.split("$")[1]
      .split(" ")[0];

    priceArray.push(Number(price));
  }

  for (let i = 0; i < info.length; i++) {
    let name = titleArray[i];
    let price = priceArray[i];
    let imgURL = imgArray[i];
    let size = sizeArray[Math.floor(Math.random() * 3)];
    let color = "White";
    if (name.toLowerCase().includes("black")) {
      color = "Black";
    } else if (name.toLowerCase().includes("blue")) {
      color = "Blue";
    } else if (name.toLowerCase().includes("coal")) {
      color = "Coal";
    } else if (name.toLowerCase().includes("grey")) {
      color = "Grey";
    } else if (name.toLowerCase().includes("white")) {
      color = "White";
    } else if (name.toLowerCase().includes("red")) {
      color = "Red";
    } else if (name.toLowerCase().includes("pink")) {
      color = "Pink";
    } else if (name.toLowerCase().includes("brown")) {
      color = "Brown";
    } else if (name.toLowerCase().includes("green")) {
      color = "Green";
    }
    let product = {
      name: name,
      price: price,
      imgURL: imgURL,
      color: color,
      size: size,
      quantity: Math.ceil(Math.random() * 10),
    };
    await Product.create(product);
    let newArr = sizeArray.filter((elem) => elem != size);
    product = {
      ...product,
      size: newArr[Math.floor(Math.random() * 2)],
      quantity: Math.ceil(Math.random() * 10),
    };

    await Product.create(product);
    productsArray.push(product);
  }
};

const createAdmin = async () => {
  const salt = await bcrypt.genSalt(10);
  const password = "123";
  const pwd = await bcrypt.hash(password, salt);
  await User.create({
    email: "quyenchuong1998@gmail.com",
    password: pwd,
    role: "seller",
  });
};
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Mongoose connected");
});

webScraper();
createAdmin();
