import express from "express";
import protect from "../middleware/authMiddelware.js";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getUser);

export default userRouter;
