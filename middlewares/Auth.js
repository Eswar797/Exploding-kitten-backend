import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const Auth = async (req, res, next) => {
  let token = req.headers.authorization || req.headers.Authorization;
  try {
    if (token) {
      token = token.split(" ")[1];
      if (token) {
        let { id } = await jwt.decode(token, process.env.SECRET_KEY);
        let user = await User.findById(id);
        if (user) {
          req.user = user._id;
          next();
        } else {
          res.status(403).json({ message: "User doesn't exist" });
        }
      } else {
        res.status(403).json({ message: "Invalid Token" });
      }
    } else {
      res.status(404).json({ message: "Token is Missing" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
