import express from "express";
import colors from "colors";
import * as dotenv from "dotenv";
import songRouter from "./routes/songRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/songs", songRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}!`));
