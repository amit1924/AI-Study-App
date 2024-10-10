// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Section from "./components/Section";
import Navbar from "./components/Navbar";
import Article from "./components/Article"; // Import the Article component
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="bg-slate-900 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element=<Home /> />
          <Route path="/:section" element={<Section />} />
          <Route path="/articles/:id" element={<Article />} />{" "}
          {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
