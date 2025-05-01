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
       return (
         <div className="dashboard-container">
           <h2>Welcome to BaseCamp!</h2>
           <h3>Your Launchpad for Coding Success. Easy access to everything you need for ADC Bootcamp!</h3>
           <div className="card-grid">
             <div className="card" onClick={() => setCurrentPage("assignments")}>
               <h3>Homework Assignments</h3>
               <p>Track your homework and due dates.</p>
               <img
                   src="https://cdn-icons-png.freepik.com/256/8019/8019801.png?semt=ais_hybrid"
                   alt="Assignment"
                   className="Assignment-logo"
               />
             </div>
             <div className="card" onClick={() => setCurrentPage("practice")}>
               <h3>Practice</h3>
               <p>Try randomly selected problems and improve your skills.</p>
               <img
                   src="https://cdn-icons-png.flaticon.com/512/1646/1646417.png"
                   alt="Practice Problems"
                   className="Practice Problems -logo"
               />
             </div>
             <div className="card" onClick={() => setCurrentPage("resources")}>
               <h3>Resources</h3>
               <p>Access extra readings and helpful materials.</p>
               <img
                   src="https://png.pngtree.com/png-vector/20230306/ourmid/pngtree-need-help-sign-support-service-vector-png-image_6635030.png"
                   alt="Resources"
                   className="Resources-logo"
               />
             </div>
           </div>
         </div>
       );
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
   <div>
     <div className="header">
       <a href="/Dashboard" className="title-link">
         <h2>BaseCamp</h2>
       </a>
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
     </div>


     <nav>
       <button onClick={() => setCurrentPage("dashboard")}>Home</button>
       <button onClick={() => setCurrentPage("assignments")}>Assignments</button>
       <button onClick={() => setCurrentPage("practice")}>Practice</button>
       <button onClick={() => setCurrentPage("resources")}>Resources</button>
     </nav>


     {renderPage()}
   </div>
 );
}


export default App;


