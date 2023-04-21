import asyncHandler from "express-async-handler";
import Song from "../models/songModel.js";
import User from "../models/userModel.js";

// @desc    Get songs
// @route   GET /api/songs
// @access  Public
export const getSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find();
  res.status(200).json(songs);
});

// @desc    Create song
// @route   POST /api/songs
// @access  Private
export const createSong = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.author) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const song = await Song.create({
    name: req.body.name,
    author: req.body.author,
    user: req.user.id,
  });

  res.status(200).json(song);
});

// @desc    Update song
// @route   PUT /api/songs/:id
// @access  Private
export const updateSong = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);

  if (!song) {
    res.status(400);
    throw new Error("Song not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Logged in user must match song owner
  if (song.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedSong);
});

// @desc    Delete song
// @route   DELETE /api/songs/:id
// @access  Private
export const deleteSong = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);

  if (!song) {
    res.status(400);
    throw new Error("Song not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Logged in user must match song owner
  if (song.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await song.deleteOne();

  res.status(200).json({ id: req.params.id });
});
