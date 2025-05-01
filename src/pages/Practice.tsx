import { useState, useEffect } from "react";

interface Problem {
  title: string;
  difficulty: string;
  description: string;
  url: string;
}

const problems: Problem[] = [
  {
    "title": "Two Sum",
    "difficulty": "Easy",
    "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target. Each input has exactly one solution, and you may not use the same element twice.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Reverse Integer",
    "difficulty": "Easy",
    "description": "Given a 32-bit signed integer, reverse its digits.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Palindrome Number",
    "difficulty": "Easy",
    "description": "Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "description": "Given a Roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "description": "Write a function to find the longest common prefix string amongst an array of strings. Return an empty string if there is no common prefix.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "description": "Given a string containing just '(', ')', '{', '}', '[' and ']', determine if it is valid. Brackets must be closed in the correct order.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "description": "Merge two sorted linked lists and return it as a new list by splicing together the nodes of the first two lists.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "description": "Given a sorted array nums, remove the duplicates in-place such that each element appears only once and return the new length.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Remove Element",
    "difficulty": "Easy",
    "description": "Given an array nums and a value val, remove all instances of that value in-place and return the new length.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Implement strStr()",
    "difficulty": "Easy",
    "description": "Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "description": "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the result as a linked list.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "description": "Given a string, find the length of the longest substring without repeating characters.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "description": "Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "3Sum",
    "difficulty": "Medium",
    "description": "Given an array nums, find all unique triplets (a, b, c) such that a + b + c = 0. No duplicate triplets allowed.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "3Sum Closest",
    "difficulty": "Medium",
    "description": "Given an array nums and an integer target, find three integers in nums such that the sum is closest to target.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "description": "Given a string containing digits from 2-9, return all possible letter combinations that the number could represent.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "4Sum",
    "difficulty": "Medium",
    "description": "Given an array nums and a target, find all unique quadruplets (a, b, c, d) such that a + b + c + d = target.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "description": "Given a linked list, remove the n-th node from the end and return the head of the modified list.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Swap Nodes in Pairs",
    "difficulty": "Medium",
    "description": "Swap every two adjacent nodes in a linked list. You may not modify the values, only node pointers.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Divide Two Integers",
    "difficulty": "Medium",
    "description": "Divide two integers without using multiplication, division and mod operator. Truncate toward zero.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "description": "There are two sorted arrays nums1 and nums2. Find the median of the two sorted arrays with O(log (m+n)) complexity.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "description": "Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Reverse Nodes in k-Group",
    "difficulty": "Hard",
    "description": "Reverse the nodes of a linked list k at a time. If remaining nodes < k, leave them as-is.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Substring with Concatenation of All Words",
    "difficulty": "Hard",
    "description": "Given a string s and a list of words, find all starting indices of substring(s) that is a concatenation of each word in words exactly once.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Longest Valid Parentheses",
    "difficulty": "Hard",
    "description": "Given a string containing just '(' and ')', find the length of the longest valid (well-formed) parentheses substring.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Jump Game II",
    "difficulty": "Hard",
    "description": "Given an array of non-negative integers, each element represents your max jump length. Return the minimum number of jumps to reach the end.",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Insert Interval",
    "difficulty": "Hard",
    "description": "Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).",
    "url": "https://leetcode.ca/all/problems.html"
  },
  {
    "title": "Wildcard Matching",
    "difficulty": "Hard",
    "description": "Given an input string s and a pattern p, implement wildcard matching with support for '?' and '*'.",
    "url": "https://leetcode.ca/all/problems.html"
  }
];

function Practice() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedProblems');
    return new Set(saved ? JSON.parse(saved) : []);
  });

  useEffect(() => {
    localStorage.setItem('completedProblems', JSON.stringify([...completedProblems]));
  }, [completedProblems]);

  const fetchRandomProblem = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * problems.length);
      setProblem(problems[randomIndex]);
      setLoading(false);
    }, 500);
  };

  const toggleProblemCompletion = (title: string) => {
    const newCompleted = new Set(completedProblems);
    if (newCompleted.has(title)) {
      newCompleted.delete(title);
    } else {
      newCompleted.add(title);
    }
    setCompletedProblems(newCompleted);
  };

  const progressPercentage = (completedProblems.size / problems.length) * 100;

  return (
    <div>
      <h1>Practice Problems</h1>
      
      {/* Progress Bar */}
      <div style={{ 
        width: '100%', 
        backgroundColor: '#e0e0e0', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <div style={{
          width: `${progressPercentage}%`,
          backgroundColor: '#4CAF50',
          height: '20px',
          borderRadius: '10px',
          transition: 'width 0.3s ease-in-out'
        }} />
      </div>
      <p>Progress: {completedProblems.size} of {problems.length} completed ({progressPercentage.toFixed(1)}%)</p>

      <button onClick={fetchRandomProblem} disabled={loading}>
        {loading ? "Loading..." : "Get Random Problem"}
      </button>

      {problem && (
        <div style={{ border: "1px solid #ccc", marginTop: "20px", padding: "10px" }}>
          <h2>{problem.title}</h2>
          <p><strong>Difficulty:</strong> {problem.difficulty}</p>
          <p>{problem.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href={problem.url} target="_blank" rel="noreferrer">
              Go to Problem
            </a>
            <button 
              onClick={() => toggleProblemCompletion(problem.title)}
              style={{
                backgroundColor: completedProblems.has(problem.title) ? '#4CAF50' : '#f0f0f0',
                color: completedProblems.has(problem.title) ? 'white' : 'black',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {completedProblems.has(problem.title) ? 'Completed ✓' : 'Mark as Complete'}
            </button>
          </div>
        </div>
      )}

      {/* Problem List with Completion Status */}
      <div style={{ marginTop: '30px' }}>
        <h2>All Problems</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '15px' 
        }}>
          {problems.map((p) => (
            <div 
              key={p.title}
              style={{ 
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: completedProblems.has(p.title) ? '#e8f5e9' : 'white'
              }}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>{p.title}</h3>
              <p style={{ margin: '5px 0' }}><strong>Difficulty:</strong> {p.difficulty}</p>
              <button 
                onClick={() => toggleProblemCompletion(p.title)}
                style={{
                  backgroundColor: completedProblems.has(p.title) ? '#4CAF50' : '#f0f0f0',
                  color: completedProblems.has(p.title) ? 'white' : 'black',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {completedProblems.has(p.title) ? 'Completed ✓' : 'Mark as Complete'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Practice;