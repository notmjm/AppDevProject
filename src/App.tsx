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
     <div className="header">
       <a href="/Dashboard" className="title-link">
         <h2>BaseCamp</h2>
       </a>
     </div>

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

     {renderPage()}
   </div>
 );
}


export default App;