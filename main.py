from fastapi import FastAPI, HTTPException, Path, Query
from typing import Annotated, List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # this is just an example of the data we may want to use for the leetcode sorter thing
# data = [ {"title": "Prob1", "content" : "https://leetcode.com/problems/two-sum/description/"},
#         {"title": "Prob2", "content" : "https://leetcode.com/problems/reverse-bits/"},
#         {"title": "Prob3", "content" : "https://leetcode.com/problems/palindrome-number/"},
#         {"title": "Prob4", "content" : "https://leetcode.com/problems/roman-to-integer/"},
#         {"title": "Prob5", "content" : "https://leetcode.com/problems/longest-common-prefix/"}
#         ]

# @app.get("/leetcode/{category}")

# def home(category: Annotated[str, Path(min_length=2)]):
#    for problem in data:
#       if category == problem['title']:
#             return { "problem" : problem}
#       return {"result" : "no result available"}

class ResourceIn(BaseModel):
    title: str
    link: str

class Resource(ResourceIn):
    id: str

# Initialize with sample notes
resource: List[Resource] = [
    Resource(id=str(uuid.uuid4()), title="Intro", link="https://docs.google.com/presentation/d/1VP9mrEZJZ9ALk2dBwadcGkWBg5twjUbM6VFZ7Fn3Vkk/edit?usp=sharing"),
    Resource(id=str(uuid.uuid4()), title="Git/HTML/CSS", link="https://docs.google.com/presentation/d/1wO047LhrT73QIcC5WzFhzGOtYhxap3aPq-nYbjmOSKk/edit?usp=sharing"),
    Resource(id=str(uuid.uuid4()), title="Git/CSS/JavaScript", link="https://docs.google.com/presentation/d/1RWvO8TQ_ueJyBdSHfZ6oNvq9E6J3rYovItbX_Q-r-44/edit?usp=sharing"),
    Resource(id=str(uuid.uuid4()), title="JavaScript/TypeScript", link="https://docs.google.com/presentation/d/14ooPTPyM4QZPWMBq2sg4NypMQZAHQ4rY5n6CUn6l7zI/edit?usp=sharing"),
    Resource(id=str(uuid.uuid4()), title="React Intro", link="https://docs.google.com/presentation/d/1YzEswdGs5zqZMaK8zPCaJl8PiiFFOYDnz2QVHLDAxak/edit?usp=sharing"),
    Resource(id=str(uuid.uuid4()), title="State React", link="https://docs.google.com/presentation/d/1GTiIFoT1EDLZ0Y9SC6G1f9c1-YZoMM-NMLOC8-0_-lI/edit?usp=sharing"),
    Resource(id=str(uuid.uuid4()), title="Supplemental React Reading", link="https://react.dev/learn/your-first-component"),
    Resource(id=str(uuid.uuid4()), title="FastAPI Reading", link="https://fastapi.tiangolo.com/tutorial/first-steps/"),
    Resource(id=str(uuid.uuid4()), title="Updating Objects in React Reading", link="https://react.dev/learn/updating-objects-in-state"),
    Resource(id=str(uuid.uuid4()), title="Updating Arrays in React Reading", link="https://react.dev/learn/updating-arrays-in-state"),
    Resource(id=str(uuid.uuid4()), title="Synchronizing Reading", link="https://react.dev/learn/synchronizing-with-effects"),
    Resource(id=str(uuid.uuid4()), title="Git Tutorial", link="https://youtu.be/DVRQoVRzMIY?si=kpe8cgj-8BTYlkgw"),
]

@app.get("/resources")
def resources():
    return resource
