import User from "../models/UserModel.js";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    if (!name || !email || !password) {
      res
        .status(502)
        .json({ message: "Required info  not found", success: false });
      return;
    }
    let hashedPass = await Bcrypt.hash(password, 10);
    let user = await User.findOne({ email });
    if (user) {
      res.status(403).json({ message: "User Already Exists", success: false });
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPass,
        matches: {
          total: 0,
          won: 0,
          lose: 0,
        },
      });
      res.status(200).json({
        message: `Registration Successfull`,
        name: user.name,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log(error);
  }
};

export const GetProfile = async (req, res) => {
  let id = req.user;
  try {
    let user = await User.findById(id);
    if (user) {
      res.status(200).json({ user, success: true });
    } else {
      res.status(401).json({ message: "User Not Found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(502)
        .json({ message: "Required fields  not found", success: false });
      return;
    }

    let user = await User.findOne({ email });
    if (user) {
      let matchedPass = await Bcrypt.compare(password, user.password);
      if (matchedPass) {
        let token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.status(200).json({ user, token, success: true });
      } else {
        res
          .status(403)
          .json({ message: "Invalid Credentials", success: false });
      }
    } else {
      res.status(401).json({ message: "User Not Found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log(error);
  }
};

export const UpdateMatches = async (req, res) => {
  const { result } = req.body;
  const id = req.user;
  console.log(result)
  try {
    if (!result) {
      res
        .status(502)
        .json({ message: "Required Fields not Found", success: false });
      return;
    }
    console.log(id);
    let user;
    if (result === "win") {
      user = await User.updateMany(
        { _id: id },
        { $inc: { "matches.total": 1, "matches.won": 1 } }
      );
      res
        .status(200)
        .json({ message: "Matches Result Updated Succesfully", success: true });
    } else if (result === "lose") {
      user = await User.updateMany(
        { _id: id },
        { $inc: { "matches.total": 1, "matches.lose": 1 } }
      );
      res
        .status(200)
        .json({ message: "Matches  Updated Succesfully", success: true });
    } else {
      res
        .status(502)
        .json({ message: "Pls Provide a valid result", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log(error);
  }
};
