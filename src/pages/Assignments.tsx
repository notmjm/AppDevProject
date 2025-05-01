import React, { useEffect, useState } from 'react';
import './Assignments.css';

interface Assignment {
  _id: string;
  name: string;
  url: string;
  dueDate: string;
  isSubmitted: boolean;
}

function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      _id: '1',
      name: 'Homework 1',
      url: 'https://forms.gle/MQejHVuzuVzj3uGE7',
      dueDate: '2025-02-25T19:00:00',
      isSubmitted: false
    },
    {
      _id: '2',
      name: 'Homework 2',
      url: 'https://forms.gle/6XVNWAyVc5ADfZxz9',
      dueDate: '2025-03-06T19:00:00',
      isSubmitted: false
    },
    {
      _id: '3',
      name: 'Homework 3',
      url: 'https://forms.gle/fhbZwTntgESBEY6j8',
      dueDate: '2025-03-16T19:00:00',
      isSubmitted: false
    },
    {
      _id: '4',
      name: 'Homework 4',
      url: 'https://forms.gle/2bRc93qwD8nwJafu5',
      dueDate: '2025-04-03T19:00:00',
      isSubmitted: false
    },
    {
      _id: '5',
      name: 'Homework 5',
      url: 'https://forms.gle/65u4Er1kCaEMJioa7',
      dueDate: '2025-04-20T19:00:00',
      isSubmitted: false
    }
  ]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Update time remaining every second
    const timer = setInterval(() => {
      const newTimeLeft: {[key: string]: string} = {};
      
      assignments.forEach(assignment => {
        const now = new Date().getTime();
        const dueDate = new Date(assignment.dueDate).getTime();
        const difference = dueDate - now;
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          newTimeLeft[assignment._id] = `${days}d ${hours}h ${minutes}m`;
        } else {
          // Format the due date to show when it was due
          const dueDateObj = new Date(assignment.dueDate);
          newTimeLeft[assignment._id] = `Due: ${dueDateObj.toLocaleDateString()} at ${dueDateObj.toLocaleTimeString()}`;
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [assignments]);

  const handleSubmit = (id: string) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment._id === id 
          ? { ...assignment, isSubmitted: !assignment.isSubmitted }
          : assignment
      )
    );
  };

  return (
    <div className="assignments-container">
      <h1>Assignments</h1>
      <div className="assignments-grid">
        {assignments.map(assignment => (
          <div 
            key={assignment._id} 
            className={`assignment-card ${assignment.isSubmitted ? 'submitted' : ''}`}
          >
            <h2>{assignment.name}</h2>
            <div className="timer">
              <span className="timer-label">
                {new Date(assignment.dueDate).getTime() - new Date().getTime() > 0 
                  ? "Time Remaining:" 
                  : "Past Due -"}
              </span>
              <span className="timer-value">{timeLeft[assignment._id]}</span>
            </div>
            <div className="assignment-actions">
              <a 
                href={assignment.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="assignment-link"
              >
                Open Assignment
              </a>
              <button 
                onClick={() => handleSubmit(assignment._id)}
                className={`submit-button ${assignment.isSubmitted ? 'submitted' : ''}`}
              >
                {assignment.isSubmitted ? 'Submitted ✓' : 'Mark as Submitted'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assignments;