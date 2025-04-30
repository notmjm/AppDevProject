// import React from 'react';
import React, { useState } from "react";

interface Problem {
  title: string;
  difficulty: string;
  description: string;
  url: string;
}

function Practice(){
  const [problem, setProblem] = useState<Problem | null>(null);

  const getRandomProblem = async () => {
    const res = await fetch("http://localhost:3001/api/random-problem");
    const data = await res.json();
    setProblem(data);
  }

  return (
    <div>
      <h1>Practice Problems</h1>
      <button onClick={getRandomProblem}>Generate Random Problem</button>
      {problem && (
        <div>
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
