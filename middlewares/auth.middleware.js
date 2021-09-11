import env from "dotenv";
import jwt from "jsonwebtoken";
const authMiddleware = {};

env.config();
const SECRET_KEY = process.env.SECRET_KEY;
authMiddleware.loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Login required.");
    }
    token = token.split("Carrier ")[1];
    jwt.verify(token, SECRET_KEY, (error, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).send("Token Expired");
        } else return res.status(401).send("Token is invalid");
      }
      req.userId = payload._id;
    });
  } catch (err) {
    res.send(err);
  }
};

export default authMiddleware;
