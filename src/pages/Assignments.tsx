// import React from 'react';
import React, { useEffect, useState } from 'react';

interface Assignment {
  name: string;
  url: string;
}

function Assignments(){
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await fetch("http://localhost:5173/assignments");
      const data = await res.json();
      setAssignments(data);
    };
    fetchAssignments();
  }, []);

  return (
    <div>
      <h3>Assignments</h3>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index}>
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
