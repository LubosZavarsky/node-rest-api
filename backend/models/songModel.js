import mongoose from "mongoose";

const songSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add author"],
    },
    author: {
      type: String,
      required: [true, "Please add author"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Song", songSchema);
