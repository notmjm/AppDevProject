import React, { useEffect, useState } from 'react';

// Update interface to match your MongoDB document structure
interface Resource {
  _id?: string;
  title: string; // Changed from name to title based on server code
  link: string;  // Changed from url to link based on server code
}

function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5173/resources");
        
        // Check if response is OK
  
        
        const data = await res.json();
        setResources(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchResources();
  }, []);
  return (
    <div>
      <h1>Resources</h1>
      <ul>
        <li><a href="https://docs.google.com/presentation/d/1VP9mrEZJZ9ALk2dBwadcGkWBg5twjUbM6VFZ7Fn3Vkk/edit?usp=sharing">Bootcamp Introduction</a></li>
        <li><a href="https://docs.google.com/presentation/d/1VP9mrEZJZ9ALk2dBwadcGkWBg5twjUbM6VFZ7Fn3Vkk/edit?usp=sharing">Git + HTML + CSS</a></li>
        <li><a href="https://docs.google.com/presentation/d/1RWvO8TQ_ueJyBdSHfZ6oNvq9E6J3rYovItbX_Q-r-44/edit?usp=sharing">Intermediate Git, CSS, and JavaScript</a></li>
        <li><a href="https://docs.google.com/presentation/d/14ooPTPyM4QZPWMBq2sg4NypMQZAHQ4rY5n6CUn6l7zI/edit?usp=sharing">JavaScript + Await/Async + Typescript</a></li>
        <li><a href="https://docs.google.com/presentation/d/1YzEswdGs5zqZMaK8zPCaJl8PiiFFOYDnz2QVHLDAxak/edit?usp=sharing">Learning React</a></li>
        <li><a href="https://docs.google.com/presentation/d/1GTiIFoT1EDLZ0Y9SC6G1f9c1-YZoMM-NMLOC8-0_-lI/edit?usp=sharing">State in React</a></li>
      </ul>
    </div>
  );
}

export default Resources;