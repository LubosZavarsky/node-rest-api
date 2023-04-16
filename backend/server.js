import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.get("/api/songs", (req, res) => {
  res.status(200).json({ message: "Song sent" });
});

app.listen(port, () => console.log(`Server started on port ${port}!`));
