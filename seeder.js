const jsdom = require("jsdom");
const Product = require("./models/Product.model");
const mongoose = require("mongoose");
require("dotenv").config();
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
      size: sizeArray[Math.floor(Math.random() * 3)],
      quantity: Math.ceil(Math.random() * 10),
    };
    let productObj = await Product.create(product);
    productsArray.push(product);
  }
};
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Mongoose connected");
});
webScraper();
