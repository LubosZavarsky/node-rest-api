import express from "express";
import colors from "colors";
import * as dotenv from "dotenv";
import songRouter from "./routes/songRoutes.js";
import userRouter from "./routes/userRoutes.js";
import errorHandler from "./middleware/ahoj.js";
import connectDB from "./config/db.js";
import { URL } from "url";
import cors from "cors";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/songs", songRouter);
app.use("/api/users", userRouter);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  const __dirname = new URL(".", import.meta.url).pathname;
  app.use(express.static(__dirname + "../frontend/"));

  app.get("*", (req, res) =>
    res.sendFile(__dirname + "../frontend/index.html")
  );
} else {
  app.get("/", (req, res) => res.send("Please set env to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}!`));
