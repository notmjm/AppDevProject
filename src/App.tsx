import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Practice from "./pages/Practice";
import Resources from "./pages/Resources";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  function renderPage() {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case "assignments":
        return <Assignments />;
      case "practice":
        return <Practice />;
      case "resources":
        return <Resources />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  }

  return (
    <div>
      {/* Header stays at top */}
      <div className="header">
        <a href="/" className="title-link">
          <h2>BaseCamp</h2>
        </a>
      </div>

      {/* Navigation bar (no scroll behavior) */}
      <nav>
        <button onClick={() => setCurrentPage("dashboard")}>Home</button>
        <button onClick={() => setCurrentPage("assignments")}>Assignments</button>
        <button onClick={() => setCurrentPage("practice")}>Practice</button>
        <button onClick={() => setCurrentPage("resources")}>Resources</button>
        <a
          href="https://github.com/KiberVG/bootcampspring2025code/tree/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            alt="GitHub"
            className="github-logo"
          />
        </a>
      </nav>

      {/* Main content */}
      <div className="main-content">{renderPage()}</div>
    </div>
  );
}

export default App;
