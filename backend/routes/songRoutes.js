import express from "express";
import protect from "../middleware/authMiddelware.js";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
} from "../controllers/songController.js";

const songRouter = express.Router();

songRouter.route("/").get(getSongs).post(protect, createSong);
songRouter.route("/:id").put(protect, updateSong).delete(protect, deleteSong);

export default songRouter;
