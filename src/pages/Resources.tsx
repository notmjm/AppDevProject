// import React from 'react';
import React, { useEffect, useState } from 'react';


const API_URL = "http://localhost:8000";

type resource = {
  title: string;
  link: string;
};



const Resources = () => {
  const [resources, setResources] = useState<resource[]>([]);

useEffect(  () => {

    fetch(`${API_URL}/resources`)
      .then((res) => res.json())
      .then((data) => setResources(data));
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


