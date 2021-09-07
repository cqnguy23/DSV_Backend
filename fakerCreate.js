const Product = require("./models/Product.model");
const mongoose = require("mongoose");
const data = [
  {
    name: "SAVANNA WIDE LEG PANT WHITE",
    imgURL:
      "https://cdn.shopify.com/s/files/1/2153/3679/products/6483231.WHT_2_375x480.jpg?v=1630924229",
    price: 79.95,
    category: "Pants",
    color: "white",
  },
  {
    name: "SIERRA SHORT HERITAGE BLUE",
    imgURL:
      "https://cdn.shopify.com/s/files/1/2153/3679/products/6093236.DEN_2_375x480.jpg?v=1629712252",
    price: 79.95,
    category: "Shorts",
    color: "blue",
  },
  {
    name: "SIERRA SHORT LIGHT BLUE",
    imgURL:
      "https://cdn.shopify.com/s/files/1/2153/3679/products/6093236.LBU_2_375x480.jpg?v=1629712230",
    price: 79.95,
    category: "Shorts",
    color: "blue",
  },
  {
    name: "WEDGIE STRAIGHT MONTGOMERY MONTOGMERY",
    imgURL:
      "https://cdn.shopify.com/s/files/1/2153/3679/products/34964-0071.DEN_2_375x480.jpg?v=1629712207",
    price: 139.95,
    category: "Pants",
    color: "blue",
  },
];
const MONGODB_URI = "mongodb://localhost:27017/dsv";
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Mongoose connected");
});
const createProducts = () => {
  data.forEach((product) => {
    Product.create(product);
  });
};

createProducts();
