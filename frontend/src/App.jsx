// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Section from "./components/Section";
import Navbar from "./components/Navbar";
import Article from "./components/Article"; // Import the Article component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/:section" element={<Section />} />
        <Route path="/articles/:id" element={<Article />} />{" "}
        {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
