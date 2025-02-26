const express = require("express");
const Score = require("../models/Score");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { username, time } = req.body;
    const newScore = new Score({ username, time });
    await newScore.save();
    res.json({ message: "Score saved!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving score", error });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const scores = await Score.find().sort({ time: 1 }).limit(10);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
});

module.exports = router;
