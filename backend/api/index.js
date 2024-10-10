// const express = require("express");
// const mongoose = require("mongoose");
// const axios = require("axios");
// const cron = require("node-cron");
// const dotenv = require("dotenv");
// const Article = require("../models/Article");
// const topics = require("../topics");
// const articleRoutes = require("../routes/articleRoutes");
// const cors = require("cors");

// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: "https://ai-study-app-frontend.vercel.app",
//     methods: ["GET"],
//     credentials: true, // Enable sending cookies and headers with requests if necessary
//   })
// );

// // Preflight response for all routes
// app.options("*", cors());

// // MongoDB connection

// const dbConnect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log(`mongodb connection established`);
//   } catch (error) {
//     console.log(`error connecting to MongoDB ${error.message}`);
//   }
// };

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });
// // Function to fetch AI content for a specific section
// async function fetchContentFromGeminiAI(section) {
//   try {
//     const sectionTopics = topics[section];
//     const randomTopic =
//       sectionTopics[Math.floor(Math.random() * sectionTopics.length)];

//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `Write a detailed blog post about ${randomTopic}`,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         // headers: {
//         //   "Content-Type": "application/json",
//         // },
//       }
//     );

//     const data = response.data;
//     // console.log("Gemini API Response:", data);
//     if (data.candidates && data.candidates[0].content.parts[0].text) {
//       const aiResponse = data.candidates[0].content.parts[0].text;
//       //   console.log("Fetched content: ", aiResponse);
//       const newArticle = new Article({
//         title: `${section}: ${randomTopic}`,
//         description: aiResponse,
//         section,
//         subSection: randomTopic,
//       });
//       await newArticle.save();
//     }
//   } catch (error) {
//     console.error(`Error fetching content for ${section}:`, error);
//   }
// }

// // Schedule content fetching daily for each section

// // cron.schedule("0 * * * *", async () => {
// //   console.log("Fetching new content from Gemini AI...");
// //   await Promise.all([
// //     fetchContentFromGeminiAI("History"),
// //     fetchContentFromGeminiAI("Biology"),
// //     fetchContentFromGeminiAI("Physics"),
// //     fetchContentFromGeminiAI("Chemistry"),
// //   ]);
// //   console.log("Content fetching complete.");
// // });
// fetchContentFromGeminiAI("History");
// fetchContentFromGeminiAI("Biology");
// fetchContentFromGeminiAI("Physics");
// fetchContentFromGeminiAI("Chemistry");
// fetchContentFromGeminiAI("Geography");
// fetchContentFromGeminiAI("Polity");
// fetchContentFromGeminiAI("Economics");

// // API routes for articles
// app.use("/articles", articleRoutes);

// const PORT = process.env.PORT || 3001;
// dbConnect();
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const dotenv = require("dotenv");
const Article = require("../models/Article");
const topics = require("../topics");
const articleRoutes = require("../routes/articleRoutes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://ai-study-app-frontend.vercel.app",
    methods: ["GET"],
    credentials: true,
  })
);

// MongoDB connection
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connection established`);
  } catch (error) {
    console.log(`error connecting to MongoDB ${error.message}`);
  }
};

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Function to fetch AI content for a specific section
const fetchedTopics = {}; // Object to track fetched topics for each section

async function fetchContentFromGeminiAI(section) {
  try {
    const sectionTopics = topics[section];
    const availableTopics = sectionTopics.filter(
      (topic) => !fetchedTopics[section]?.has(topic) // Filter out previously fetched topics
    );

    if (availableTopics.length === 0) {
      console.log(`All topics have been fetched for ${section}.`);
      return; // Exit if all topics have been fetched
    }

    const randomTopic =
      availableTopics[Math.floor(Math.random() * availableTopics.length)];

    // Update fetched topics
    if (!fetchedTopics[section]) {
      fetchedTopics[section] = new Set();
    }
    fetchedTopics[section].add(randomTopic);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Write a detailed blog post about ${randomTopic}`,
              },
            ],
          },
        ],
      }
    );

    const data = response.data;
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      const newArticle = new Article({
        title: `${section}: ${randomTopic}`,
        description: aiResponse,
        section,
        subSection: randomTopic,
      });
      await newArticle.save();
    }
  } catch (error) {
    console.error(`Error fetching content for ${section}:`, error);
  }
}

// Fetch content for all sections
const fetchAllContent = async () => {
  await Promise.all([
    fetchContentFromGeminiAI("History"),
    fetchContentFromGeminiAI("Biology"),
    fetchContentFromGeminiAI("Physics"),
    fetchContentFromGeminiAI("Chemistry"),
    fetchContentFromGeminiAI("Geography"),
    fetchContentFromGeminiAI("IndianPolity"),
    fetchContentFromGeminiAI("Economics"),
  ]);
};

fetchAllContent();

// API routes for articles
app.use("/articles", articleRoutes);

const PORT = process.env.PORT || 3001;
dbConnect();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
