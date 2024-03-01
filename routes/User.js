import express from "express";
import {
  GetProfile,
  Login,
  SignUp,
  UpdateMatches,
} from "../controllers/User.js";
import { Auth } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/profile", Auth, GetProfile);
router.put("/matches", Auth, UpdateMatches);

export default router;
