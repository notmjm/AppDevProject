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
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
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

  if (loading) return <div>Loading resources...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (resources.length === 0) return <div>No resources found.</div>;

  return (
    <div>
      <h1>Resources</h1>
      <ul>
        {resources.map((resource, index) => (
          <li key={resource._id || index}>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resources;