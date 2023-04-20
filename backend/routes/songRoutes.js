import express from "express";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
} from "../controllers/songController.js";

const songRouter = express.Router();

songRouter.route("/").get(getSongs).post(createSong);
songRouter.route("/:id").put(updateSong).delete(deleteSong);

export default songRouter;
