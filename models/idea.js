const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: String,
  date: { type: Date, default: Date.now }
});

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
