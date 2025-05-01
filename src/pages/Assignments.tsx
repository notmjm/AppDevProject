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
        const res = await fetch("http://localhost:5173/assignments");
        if (res.ok) {
          const data = await res.json();
          setAssignments(data); // Set assignments in state
        } else {
          throw new Error("Failed to fetch assignments");
        }
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments. Please try again later.");
      }
    };
  
    fetchAssignments();
  }, []);


  return (
    <div>
      <h1>Assignments</h1>
      <ul>
          <li>Homework 1: <br></br>
            <ul>
              <li>Due Date: Februrary 25, 2025 @ 7:00PM</li>
              <li><a href= "https://forms.gle/MQejHVuzuVzj3uGE7">Link</a></li>
            </ul>
          </li>
          <li>Homework 2: <br />
          <ul>
              <li>Due Date: March 6, 2025 @ 7:00PM</li>
              <li><a href= "https://forms.gle/6XVNWAyVc5ADfZxz9">Link</a></li>
            </ul>
          </li>
          <li>Homework 3: <br />
          <ul>
              <li>Due Date: March 16, 2025 @ 7:00PM</li>
              <li><a href= "https://forms.gle/fhbZwTntgESBEY6j8">Link</a></li>
            </ul>
          </li>
          <li>Homework 4: <br />
          <ul>
              <li>Due Date: April 3: 2025 @ 7:00PM</li>
              <li><a href= "https://forms.gle/2bRc93qwD8nwJafu5">Link</a></li>
            </ul>
          </li>
          <li>Homework 5: <br />
          <ul>
              <li>Due Date: April 20, 2025 @ 7:00PM</li>
              <li><a href= "https://forms.gle/65u4Er1kCaEMJioa7">Link</a></li>
            </ul>
          </li>
      </ul>
    </div>
  );
};

export default Assignments;