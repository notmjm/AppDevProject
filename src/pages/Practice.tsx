import React, { useState } from "react";

interface Problem {
  _id?: string, // MongoDB ID
  id?: string,  // Custom ID field
  title: string;
  difficulty: string;
  description: string;
  url: string;
}

function Practice(){
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomProblem = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch("http://localhost:5173/practice");
      
      // Check if response is OK before parsing
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      const data = await res.json();
      setProblem(data);
    } catch (error) {
      console.error("Error fetching problem:", error);
      setError("Failed to fetch a practice problem. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Practice Problems</h1>
      <button 
        onClick={fetchRandomProblem} 
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Random Problem"}
      </button>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

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