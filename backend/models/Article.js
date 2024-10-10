const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  section: String,
  subSection: String,
  createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
