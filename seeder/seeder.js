import jsdom from "jsdom";
import Product from "../models/Product.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import env from "dotenv";
import User from "../models/User.model.js";
import Category from "../models/Category.model.js";
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
const createCategory = async () => {
  const categories = [
    "Jacket",
    "Tee",
    "Short",
    "Hood",
    "Pant",
    "Top",
    "Sweater",
    "Jean",
    "Shirt",
    "Other",
  ];
  for (const category of categories) {
    await Category.create({ name: category });
  }
  console.log("Finished creating category");
};
const assignCategory = async () => {
  const products = await Product.find({});
  const brand = ["Gucci", "BOSS", "Dior", "Lacoste", "Prada", "LV"];

  for (const product of products) {
    if (product.name.toLowerCase().includes("jacket")) {
      const category = await Category.find({ name: "Jacket" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    } else if (product.name.toLowerCase().includes("tee")) {
      const category = await Category.find({ name: "Tee" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    } else if (product.name.toLowerCase().includes("short")) {
      const category = await Category.find({ name: "Short" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    } else if (product.name.toLowerCase().includes("hood")) {
      const category = await Category.find({ name: "Hood" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    } else if (product.name.toLowerCase().includes("pant")) {
      const category = await Category.find({ name: "Pant" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    } else if (product.name.toLowerCase().includes("top")) {
      const category = await Category.find({ name: "Top" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    } else if (product.name.toLowerCase().includes("sweater")) {
      const category = await Category.find({ name: "Sweater" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    } else if (product.name.toLowerCase().includes("jean")) {
      const category = await Category.find({ name: "Jean" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    } else if (product.name.toLowerCase().includes("shirt")) {
      const category = await Category.find({ name: "Shirt" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    } else {
      const category = await Category.find({ name: "Other" });
      await Product.findByIdAndUpdate(product._id, {
        $push: { category: category },
      });
    }
  }
  console.log("Finished update category");
  // console.log("Finished update brand");
};

const createAdmin = async () => {
  const pwd = "123456";
  await User.create({
    email: "quyenchuong1998@gmail.com",
    password: pwd,
    role: "seller",
  });
};
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Mongoose connected");
  // createCategory();
  assignCategory();
});
const test = async () => {
  const gender = null;
  const products = await Product.updateMany(
    {},
    { category: [] },
    { new: true }
  );
  console.log(products);
};
// createAdmin();
// webScraperFemale();
// webScraperMale();
// webScraperBoys();
// webScraperGirls();
// test();
