from fastapi import FastAPI, HTTPException, Path, Query
from typing import Annotated, List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# this is just an example of the data we may want to use for the leetcode sorter thing
data = [ {"title": "Prob1", "content" : "https://leetcode.com/problems/two-sum/description/"},
        {"title": "Prob2", "content" : "https://leetcode.com/problems/reverse-bits/"},
        {"title": "Prob3", "content" : "https://leetcode.com/problems/palindrome-number/"},
        {"title": "Prob4", "content" : "https://leetcode.com/problems/roman-to-integer/"},
        {"title": "Prob5", "content" : "https://leetcode.com/problems/longest-common-prefix/"}
        ]

@app.get("/leetcode/{category}")

def home(category: Annotated[str, Path(min_length=2)]):
   for problem in data:
      if category == problem['title']:
            return { "problem" : problem}
      return {"result" : "no result available"}
      
