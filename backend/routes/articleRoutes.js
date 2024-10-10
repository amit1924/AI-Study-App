const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

// Get all articles by section
// router.get("/:section", async (req, res) => {
//   console.log(`Fetching articles for section: ${req.params.section}`);
//   try {
//     const articles = await Article.find({ section: req.params.section });

//     console.log(
//       "All Articles:",
//       articles.map((article) => article.section)
//     );

//     console.log("Found articles:", JSON.stringify(articles));
//     console.log("Regex pattern:", new RegExp(req.params.section, "i"));
//     // Log found articles
//     res.json(articles);
//   } catch (error) {
//     console.error(
//       `Error fetching articles for section ${req.params.section}:`,
//       error
//     );
//     res.status(500).send("Error fetching articles");
//   }
// });

router.get("/:section", async (req, res) => {
  // Trim whitespace and newlines from section name
  const sectionName = req.params.section.trim();
  console.log(`Fetching articles for section: ${sectionName}`);

  try {
    // Create a regex pattern without newline characters
    const regexPattern = new RegExp(`^${sectionName}$`, "i");
    console.log(`Using regex pattern: ${regexPattern}`);

    const articles = await Article.find({ section: regexPattern });
    console.log("Fetched articles:", articles);
    res.json(articles);
  } catch (error) {
    console.error(`Error fetching articles for section ${sectionName}:`, error);
    res.status(500).send("Error fetching articles");
  }
});

// Add this route in your articleRoutes
router.get("/detail/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send("Article not found");
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).send("Error fetching article");
  }
});

// Get articles by section and sub-section
router.get("/:section/:subSection", async (req, res) => {
  try {
    const articles = await Article.find({
      section: req.params.section,
      subSection: req.params.subSection,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).send("Error fetching articles");
  }
});

module.exports = router;
