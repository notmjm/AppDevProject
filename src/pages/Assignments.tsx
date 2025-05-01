import React, { useEffect, useState } from 'react';

interface Assignment {
  _id: string; // MongoDB documents typically have _id
  name: string;
  url: string;
}

function Assignments(){
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5173/api/assignments");
    
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
    
        // Check if response is JSON
        const contentType = res.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setAssignments(Array.isArray(data) ? data : []);
        } else {
          throw new Error("Expected JSON, but received something else.");
        }
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssignments();
  }, []);

  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (assignments.length === 0) return <div>No assignments found.</div>;

  return (
    <div>
      <h3>Assignments</h3>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id || assignment.name}>
            <a href={assignment.url} target="_blank" rel="noopener noreferrer">
              {assignment.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;