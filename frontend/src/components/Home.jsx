import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-950 to-green-950 text-white">
      <motion.h1
        className="text-5xl font-bold mb-4 animate__animated animate__fadeInDown"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to the AI-Powered Study App!
      </motion.h1>

      <motion.p
        className="text-xl mb-6 animate__animated animate__fadeIn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Your personal assistant for efficient learning and exploration.
      </motion.p>

      <motion.div
        className="bg-white text-gray-800 rounded-lg p-6 shadow-lg w-11/12 md:w-3/4 lg:w-1/2 animate__animated animate__fadeInUp"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>🔍 Search for topics instantly with AI assistance.</li>
          <li>📝 Generate detailed articles and summaries.</li>
          <li>📅 Stay organized with a smart learning schedule.</li>
          <li>
            🌐 Access a variety of subjects including History, Biology, and
            more!
          </li>
        </ul>
      </motion.div>

      <motion.button
        className="mt-8 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-bold transition duration-300"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Home;
