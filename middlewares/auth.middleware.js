import env from "dotenv";
import jwt from "jsonwebtoken";
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
    next(err);
  }
};

authMiddleware.adminRequired = async (req, res, next) => {
  try {
    let token = req.headers.adminauthorization;
    if (!token) {
      console.log("Here");
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
    next(err);
  }
};
export default authMiddleware;
