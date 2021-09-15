import env from "dotenv";
import jwt from "jsonwebtoken";
const authMiddleware = {};

env.config();
const SECRET_KEY = process.env.SECRET_KEY;
authMiddleware.loginRequired = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Login required.");
    }

    token = token.split(" ")[1];
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

export default authMiddleware;
