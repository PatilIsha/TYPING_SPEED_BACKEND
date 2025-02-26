const express = require("express");
const Score = require("../models/Score");

const router = express.Router();

router.post("/add", async (req, res) => {
  const { username, time } = req.body;
  const newScore = new Score({ username, time });
  await newScore.save();
  res.json({ message: "Score saved!" });
});

router.get("/leaderboard", async (req, res) => {
  const scores = await Score.find().sort({ time: 1 }).limit(10);
  res.json(scores);
});

module.exports = router;
