import env from "dotenv";
import jwt from "jsonwebtoken";
import Order from "../models/Order.model.js";
import Token from "../models/TokenList.model.js";
const authMiddleware = {};

env.config();
const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
authMiddleware.loginRequired = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Login required.");
    }
    token = token.split(" ")[1];
    const invalidToken = await Token.findOne({ token: token });
    if (invalidToken) {
      return next(
        new Error("Please log in again before performing this action!")
      );
    }
    jwt.verify(token, SECRET_KEY, function (error, payload) {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return next(
            new Error("Please log in again before performing this action!")
          );
        } else next(new Error("Please log in before performing this action!"));
      }
      req.userId = payload.id;
      next();
    });
  } catch (err) {
    return next(err);
  }
};

authMiddleware.adminRequired = async (req, res, next) => {
  try {
    let token = req.headers.adminauthorization;
    if (!token) {
      return res.status(401).send("Login required.");
    }
    token = token.split(" ")[1];
    const invalidToken = await Token.findOne({ token: token });
    if (invalidToken) {
      return next(
        new Error("Please log in as an admin before performing this action!")
      );
    }
    jwt.verify(token, ADMIN_SECRET_KEY, function (error, payload) {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return next(
            new Error(
              "Please log in as an admin before performing this action!"
            )
          );
        } else
          return next(
            new Error(
              "Please log in as an admin before performing this action!"
            )
          );
      }
      req.userId = payload.id;
      if (payload.role != "seller")
        return next(
          new Error("Please log in as an admin before performing this action!")
        );
      next();
    });
  } catch (err) {
    return next(err);
  }
};

authMiddleware.reviewRequired = async (req, res, next) => {
  try {
    const userId = req.userId;
    const productID = req.params.id;
    const orders = await Order.find({ owner: userId }).populate(
      "products.product"
    );
    if (orders.length === 0) {
      return next(
        new Error("You need to purchase this item before making a review.")
      );
    }
    let hasOrdered = false;
    for (const order of orders) {
      for (const product of order.products) {
        if (productID == product.product._id) {
          hasOrdered = true;
          break;
        }
      }
    }
    if (!hasOrdered) {
      return next(
        new Error("You need to purchase this item before making a review.")
      );
    }
    next();
  } catch (err) {
    return next(err);
  }
};
export default authMiddleware;
