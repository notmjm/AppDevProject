// import React from 'react';
import React, { useState } from "react";

interface Problem {
  id: string,
  title: string;
  difficulty: string;
  description: string;
  url: string;
}

function Practice(){
  const [problem, setProblem] = useState<Problem | null>(null);

  const fetchRandomProblem = async () => {
    try {
      const res = await fetch("http://localhost:5173/practice");
      const data = await res.json();
      setProblem(data);
    } catch (error) {
      console.error("Error fetching problem:", error);
    }
  };

  return (
    <div>
      <h1>Practice Problems</h1>
      <button onClick={fetchRandomProblem}>Get Random Problem</button>

      {problem && (
        <div style={{ border: "1px solid #ccc", marginTop: "20px", padding: "10px" }}>
          <h2>{problem.title}</h2>
          <p><strong>Difficulty:</strong> {problem.difficulty}</p>
          <p>{problem.description}</p>
          <a href={problem.url} target="_blank" rel="noreferrer">Go to Problem</a>
        </div>
      )}
    </div>
  );
};

export default Practice;
