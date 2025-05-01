import React from "react";

interface Resource {
  title: string;
  url: string;
}

const resources: Resource[] = [
  {
    title: "Slides - Functions & Closures",
    url: "https://docs.google.com/presentation/d/1VP9mrEZJZ9ALk2dBwadcGkWBg5twjUbM6VFZ7Fn3Vkk/edit?usp=sharing",
  },
  {
    title: "Slides - Asynchronous JS",
    url: "https://docs.google.com/presentation/d/1wO047LhrT73QIcC5WzFhzGOtYhxap3aPq-nYbjmOSKk/edit?usp=sharing",
  },
  {
    title: "Slides - React Basics",
    url: "https://docs.google.com/presentation/d/1RWvO8TQ_ueJyBdSHfZ6oNvq9E6J3rYovItbX_Q-r-44/edit?usp=sharing",
  },
  {
    title: "Slides - React Lifecycle",
    url: "https://docs.google.com/presentation/d/14ooPTPyM4QZPWMBq2sg4NypMQZAHQ4rY5n6CUn6l7zI/edit?usp=sharing",
  },
  {
    title: "Slides - React Hooks",
    url: "https://docs.google.com/presentation/d/1YzEswdGs5zqZMaK8zPCaJl8PiiFFOYDnz2QVHLDAxak/edit?usp=sharing",
  },
  {
    title: "Slides - Full Stack Project Overview",
    url: "https://docs.google.com/presentation/d/1GTiIFoT1EDLZ0Y9SC6G1f9c1-YZoMM-NMLOC8-0_-lI/edit?usp=sharing",
  },
  {
    title: "React: Updating Objects in State",
    url: "https://react.dev/learn/updating-objects-in-state",
  },
  {
    title: "React: Updating Arrays in State",
    url: "https://react.dev/learn/updating-arrays-in-state",
  },
  {
    title: "FastAPI Tutorial - First Steps",
    url: "https://fastapi.tiangolo.com/tutorial/first-steps/",
  },
  {
    title: "React: Synchronizing with Effects",
    url: "https://react.dev/learn/synchronizing-with-effects",
  },
  {
    title: "React: Your First Component",
    url: "https://react.dev/learn/your-first-component",
  },
  {
    title: "Node.js Downloads",
    url: "https://nodejs.org/en/download",
  },
  {
    title: "MongoDB + Express + React + Node.js Setup (YouTube)",
    url: "https://youtu.be/DVRQoVRzMIY?si=kpe8cgj-8BTYlkgw",
  },
];

function Resources() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "40px",
      }}
    >
      <div style={{ maxWidth: "700px", textAlign: "left" }}>
        <h1 style={{ textAlign: "center" }}>Resources</h1>
        <ul>
          {resources.map((resource, index) => (
            <li key={index} style={{ marginBottom: "12px" }}>
              <a href={resource.url} target="_blank" rel="noreferrer">
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Resources;
