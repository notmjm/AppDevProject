import { useState } from "react";
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
    <>
      <div>
        <a href="/Dashboard">
          <h2>BaseCamp</h2>
        </a>
        <a href="https://github.com/KiberVG/bootcampspring2025code/tree/main" target="_blank">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            alt="Instructional GitHub"
          />
        </a>
        <nav>
          <button onClick={() => setCurrentPage("dashboard")}>Home</button>
          <button onClick={() => setCurrentPage("assignments")}>
            Assignments
          </button>
          <button onClick={() => setCurrentPage("practice")}>Practice</button>
          <button onClick={() => setCurrentPage("resources")}>Resources</button>
        </nav>
        {renderPage()}
      </div>
    </>
  );
}

export default App;
