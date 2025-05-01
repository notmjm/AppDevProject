import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Assignments from "./pages/Assignments.tsx";
import Practice from "./pages/Practice.tsx";
import Resources from "./pages/Resources.tsx";


import "./App.css";


function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  function renderPage() {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "assignments":
        return <Assignments />;
      case "practice":
        return <Practice />;
      case "resources":
        return <Resources />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <Router>
    <div>
      <Link to="/dashboard">
        <h2>BaseCamp</h2>
      </Link>
      <a
        href="https://github.com/KiberVG/bootcampspring2025code/tree/main"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
          alt="Instructional GitHub"
        />
      </a>
      <nav>
        <Link to="/dashboard">
          <button>Home</button>
        </Link>
        <Link to="/assignments">
          <button>Assignments</button>
        </Link>
        <Link to="/practice">
          <button>Practice</button>
        </Link>
        <Link to="/resources">
          <button>Resources</button>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </div>
  </Router>
);
}


export default App;
