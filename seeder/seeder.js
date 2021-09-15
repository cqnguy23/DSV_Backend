import jsdom from "jsdom";
import Product from "../models/Product.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import env from "dotenv";
import User from "../models/User.model.js";
import emailController from "../utils/emailController.js";
const __dirname = path.resolve();
env.config();
const { JSDOM } = jsdom;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const MONGODB_URI = process.env.MONGODB_URI;
const webScraperFemale = async () => {
  const resp = await fetch(
    "https://www.edgeclothing.com.au/collections/shop-all-women"
  );
  const text = await resp.text();
  const dom = new JSDOM(text);
  let imgArray = [];
  let imgQuery = [];
  let titleArray = [];
  let priceArray = [];
  let img = dom.window.document.getElementsByClassName("imgcontain");
  let info = dom.window.document.getElementsByClassName("info");

  for (let i = 0; i < img.length; i++) {
    imgArray.push([]);
    imgQuery.push(
      "https://www.edgeclothing.com.au" + img[i].querySelector("a").href
    );
  }
  for (let i = 0; i < img.length; i++) {
    const imgResp = await fetch(imgQuery[i]);
    const imgText = await imgResp.text();
    const imgDom = new JSDOM(imgText);
    const imgCollection = imgDom.window.document.getElementsByClassName(
      "product__thumb-item"
    );
    for (let j = 0; j < imgCollection.length; j++) {
      imgArray[i].push("https:" + imgCollection[j].querySelector("a").href);
    }
    // console.log(imgArray[i]);
  }
  for (let i = 0; i < info.length; i++) {
    const imgResp = await fetch(imgQuery[i]);
    const imgText = await imgResp.text();
    const imgDom = new JSDOM(imgText);
    const imgCollection = imgDom.window.document.getElementsByClassName(
      "product__thumb-item"
    );
    for (let j = 0; j < imgCollection.length; j++) {
      imgArray[i].push("https:" + imgCollection[j].querySelector("a").href);
    }
    // console.log(imgArray[i]);

    titleArray.push(info[i].querySelector("a").title);
    let price = info[i]
      .getElementsByClassName("money")[1]
      .innerHTML.split("$")[1]
      .split(" ")[0];

    priceArray.push(Number(price));

    let name = titleArray[i];
    let imgURL = imgArray[i];
    let size = {
      s: Math.floor(Math.random() * 11),
      m: Math.floor(Math.random() * 11),
      l: Math.floor(Math.random() * 11),
    };
    let color = "Other";
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
      gender: "women",
      color: color,
      size: size,
    };
    await Product.create(product);
  }
  fs.writeFileSync(
    path.resolve(__dirname, "imgArray.json"),
    JSON.stringify(imgArray)
  );

  console.log("Finished women's seeding");
};

const webScraperMale = async () => {
  const resp = await fetch(
    "https://www.edgeclothing.com.au/collections/shop-all-mens"
  );
  const text = await resp.text();
  const dom = new JSDOM(text);
  let imgArray = [];
  let imgQuery = [];
  let titleArray = [];
  let priceArray = [];
  let img = dom.window.document.getElementsByClassName("imgcontain");
  let info = dom.window.document.getElementsByClassName("info");

  for (let i = 0; i < img.length; i++) {
    imgArray.push([]);
    imgQuery.push(
      "https://www.edgeclothing.com.au" + img[i].querySelector("a").href
    );
  }

  for (let i = 0; i < info.length; i++) {
    const imgResp = await fetch(imgQuery[i]);
    const imgText = await imgResp.text();
    const imgDom = new JSDOM(imgText);
    const imgCollection = imgDom.window.document.getElementsByClassName(
      "product__thumb-item"
    );
    for (let j = 0; j < imgCollection.length; j++) {
      imgArray[i].push("https:" + imgCollection[j].querySelector("a").href);
    }
    // console.log(imgArray[i]);

    titleArray.push(info[i].querySelector("a").title);
    let price = info[i]
      .getElementsByClassName("money")[1]
      .innerHTML.split("$")[1]
      .split(" ")[0];

    priceArray.push(Number(price));

    let name = titleArray[i];
    let imgURL = imgArray[i];
    let size = {
      s: Math.floor(Math.random() * 11),
      m: Math.floor(Math.random() * 11),
      l: Math.floor(Math.random() * 11),
    };
    let color = "Other";
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
      gender: "men",
      color: color,
      size: size,
    };
    await Product.create(product);
  }
  fs.writeFileSync(
    path.resolve(__dirname, "imgArray.json"),
    JSON.stringify(imgArray)
  );

  console.log("Finished men's seeding");
};

const webScraperBoys = async () => {
  const resp = await fetch(
    "https://www.edgeclothing.com.au/collections/st-goliath-8-16"
  );
  const text = await resp.text();
  const dom = new JSDOM(text);
  let imgArray = [];
  let imgQuery = [];
  let titleArray = [];
  let priceArray = [];
  let img = dom.window.document.getElementsByClassName("imgcontain");
  let info = dom.window.document.getElementsByClassName("info");

  for (let i = 0; i < img.length; i++) {
    imgArray.push([]);
    imgQuery.push(
      "https://www.edgeclothing.com.au" + img[i].querySelector("a").href
    );
  }

  for (let i = 0; i < info.length; i++) {
    const imgResp = await fetch(imgQuery[i]);
    const imgText = await imgResp.text();
    const imgDom = new JSDOM(imgText);
    const imgCollection = imgDom.window.document.getElementsByClassName(
      "product__thumb-item"
    );
    for (let j = 0; j < imgCollection.length; j++) {
      imgArray[i].push("https:" + imgCollection[j].querySelector("a").href);
    }
    // console.log(imgArray[i]);

    titleArray.push(info[i].querySelector("a").title);
    let price = info[i]
      .getElementsByClassName("money")[1]
      .innerHTML.split("$")[1]
      .split(" ")[0];

    priceArray.push(Number(price));

    let name = titleArray[i];
    let imgURL = imgArray[i];
    let size = {
      s: Math.floor(Math.random() * 11),
      m: Math.floor(Math.random() * 11),
      l: Math.floor(Math.random() * 11),
    };
    let color = "Other";
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
      gender: "boys",
      color: color,
      size: size,
    };
    await Product.create(product);
  }
  fs.writeFileSync(
    path.resolve(__dirname, "imgArray.json"),
    JSON.stringify(imgArray)
  );

  console.log("Finished boys' seeding");
};

const webScraperGirls = async () => {
  const resp = await fetch(
    "https://www.edgeclothing.com.au/collections/eve-sister-1"
  );
  const text = await resp.text();
  const dom = new JSDOM(text);
  let imgArray = [];
  let imgQuery = [];
  let titleArray = [];
  let priceArray = [];
  let img = dom.window.document.getElementsByClassName("imgcontain");
  let info = dom.window.document.getElementsByClassName("info");

  for (let i = 0; i < img.length; i++) {
    imgArray.push([]);
    imgQuery.push(
      "https://www.edgeclothing.com.au" + img[i].querySelector("a").href
    );
  }

  for (let i = 0; i < info.length; i++) {
    const imgResp = await fetch(imgQuery[i]);
    const imgText = await imgResp.text();
    const imgDom = new JSDOM(imgText);
    const imgCollection = imgDom.window.document.getElementsByClassName(
      "product__thumb-item"
    );
    for (let j = 0; j < imgCollection.length; j++) {
      imgArray[i].push("https:" + imgCollection[j].querySelector("a").href);
    }
    // console.log(imgArray[i]);

    titleArray.push(info[i].querySelector("a").title);
    let price = info[i]
      .getElementsByClassName("money")[1]
      .innerHTML.split("$")[1]
      .split(" ")[0];

    priceArray.push(Number(price));

    let name = titleArray[i];
    let imgURL = imgArray[i];
    let size = {
      s: Math.floor(Math.random() * 11),
      m: Math.floor(Math.random() * 11),
      l: Math.floor(Math.random() * 11),
    };
    let color = "Other";
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
      gender: "girls",
      color: color,
      size: size,
    };
    await Product.create(product);
  }
  fs.writeFileSync(
    path.resolve(__dirname, "imgArray.json"),
    JSON.stringify(imgArray)
  );

  console.log("Finished girls' seeding");
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

// createAdmin();
// webScraperFemale();
// webScraperMale();
// webScraperBoys();
// webScraperGirls();
emailController.sendOrderConfirmation("quyenchuong1998@gmail.com", {
  products: [{}],
  totalPrice: 140.5,
});