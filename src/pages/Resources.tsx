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
    <>
    <div className="resources-list">
        {resources.map((resource) => (
          <div className="resource">
            <h3>{resource.title}</h3>
            <p>{resource.link}</p>
          </div>
        ))}
      </div>
    </>
   
  );
};

export default Resources;

