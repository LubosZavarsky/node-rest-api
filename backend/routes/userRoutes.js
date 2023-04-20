import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", getUser);

export default userRouter;
