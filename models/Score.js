const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  username: String,
  time: Number,
});

module.exports = mongoose.model("Score", ScoreSchema);
