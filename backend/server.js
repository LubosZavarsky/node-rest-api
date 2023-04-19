import express from "express";
import * as dotenv from "dotenv";
import router from "./routes/songRoutes.js";
import { errorHandler } from "./middleware/errorMIddleware.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/songs", router);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}!`));
