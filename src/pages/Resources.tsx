// import React from 'react';
import React, { useEffect, useState } from 'react';

interface Resource {
  name: string;
  url: string;
}

function Resources() {
  const [resources, setResources] = useState<Resource[]>([]); // plural!

  useEffect(() => {
    const fetchResources = async () => {
      const res = await fetch("http://localhost:5173/api/resources"); // added `/api/`
      const data = await res.json();
      setResources(data);
    };
    fetchResources();
  }, []);

  return (
    <div>
      <h1>Resources</h1>
      <ul>
        {resources.map((res: Resource, index: number) => (
          <li key={index}>
            <a href={res.name} target="_blank" rel="noopener noreferrer">
              {res.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Resources;


