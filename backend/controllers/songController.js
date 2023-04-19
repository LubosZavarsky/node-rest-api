import asyncHandler from "express-async-handler";

// @desc    Get songs
// @route   GET /api/songs
// @access  Public
export const getSongs = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Song sent" });
});

// @desc    Create song
// @route   POST /api/songs
// @access  Private
export const createSong = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Empty text field!");
  }
  res.status(200).json({ message: "Song created" });
});

// @desc    Update song
// @route   PUT /api/songs/:id
// @access  Private
export const updateSong = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Song ${req.params.id} updated` });
});

// @desc    Delete song
// @route   DELETE /api/songs/:id
// @access  Private
export const deleteSong = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Song ${req.params.id} deleted` });
});
