import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url'; // Missing import

// Initialize Express app
const app = express();
const port = process.env.PORT || 5173;
app.use(cors({ origin: "http://localhost:5173" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') });

const uri = process.env.MONGODB_URI;
const databaseAndLeetCodeCollection = { db: "AppDev", collection: "leetCodeProblems" };
const databaseAndAssignmentsCollection = { db: "AppDev", collection: "homeworks" };
const databaseAndResourcesCollection = { db: "AppDev", collection: "bootcampSlides" };

// Middleware
app.use(bodyParser.json()); // For parsing JSON request bodies
// Create dummy data for testing when DB is not available
const dummyAssignments = [
  { _id: "1", name: "Assignment 1", url: "https://example.com/hw1" },
  { _id: "2", name: "Assignment 2", url: "https://example.com/hw2" },
  { _id: "3", name: "Assignment 3", url: "https://example.com/hw3" }
];

const dummyProblem = {
  _id: "1",
  title: "Sample Problem",
  difficulty: "Medium",
  description: "This is a sample problem for testing.",
  url: "https://leetcode.com/sample"
};

const dummyResources = [
  { _id: "1", title: "Resource 1", link: "https://example.com/resource1" },
  { _id: "2", title: "Resource 2", link: "https://example.com/resource2" }
];

// Connect to MongoDB
const client = new MongoClient(uri, { 
  serverApi: ServerApiVersion.v1,
  connectTimeoutMS: 5000, // Add timeouts
  socketTimeoutMS: 45000
});

// Connect to MongoDB once at startup
let isConnected = false;
async function connectToMongoDB() {
  if (!uri) {
    console.warn('No MongoDB URI provided. Using dummy data.');
    return false;
  }

  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log('Connected to MongoDB');
      return true;
    }
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return false;
  }
}

// Handle application shutdown
process.on('SIGINT', async () => {
  if (client && isConnected) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Handle application shutdown
process.on('SIGINT', async () => {
  if (client) {
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const dbConnected = await connectToMongoDB();
    
    if (dbConnected) {
      const db = client.db("AppDev");
      const collection = db.collection("homeworks");
      const assignments = await collection.find({}).toArray();
      res.json(assignments.length > 0 ? assignments : dummyAssignments);
    } else {
      // Use dummy data if DB connection fails
      res.json(dummyAssignments);
    }
  } catch (err) {
    console.error("Error fetching dashboard assignments:", err);
    res.status(500).json({ error: "Error fetching assignments" });
  }
});

// Keep original routes without API prefix for backward compatibility
app.get("/dashboard", async (req, res) => {
  try {
    const dbConnected = await connectToMongoDB();
    
    if (dbConnected) {
      const db = client.db("AppDev");
      const collection = db.collection("homeworks");
      const assignments = await collection.find({}).toArray();
      res.json(assignments.length > 0 ? assignments : dummyAssignments);
    } else {
      // Use dummy data if DB connection fails
      res.json(dummyAssignments);
    }
  } catch (err) {
    console.error("Error fetching dashboard assignments:", err);
    res.status(500).json({ error: "Error fetching assignments" });
  }
});

app.get('/api/assignments', async (req, res) => {
  try {
    const db = await connectDB(); // Connect to DB
    const collection = db.collection('assignments'); // Assuming 'assignments' is your collection
    const assignments = await collection.find().toArray(); // Fetch all assignments

    res.json(assignments); // Send assignments as JSON response
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});


app.get("/practice", async (req, res) => {
  try {
    const dbConnected = await connectToMongoDB();
    
    if (dbConnected) {
      const db = client.db(databaseAndLeetCodeCollection.db);
      const collection = db.collection(databaseAndLeetCodeCollection.collection);

      // Fetch a random problem
      const problems = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
      if (problems.length === 0) {
        return res.json(dummyProblem); // Return dummy data if no problems found
      }
      res.json(problems[0]);
    } else {
      // Use dummy data if DB connection fails
      res.json(dummyProblem);
    }
  } catch (err) {
    console.error("Error fetching practice problem:", err);
    res.status(500).json({ error: "Failed to fetch practice problem" });
  }
});

app.get("/api/practice", async (req, res) => {
  try {
    const dbConnected = await connectToMongoDB();
    
    if (dbConnected) {
      const db = client.db(databaseAndLeetCodeCollection.db);
      const collection = db.collection(databaseAndLeetCodeCollection.collection);

      // Fetch a random problem
      const problems = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
      if (problems.length === 0) {
        return res.json(dummyProblem); // Return dummy data if no problems found
      }
      res.json(problems[0]);
    } else {
      // Use dummy data if DB connection fails
      res.json(dummyProblem);
    }
  } catch (err) {
    console.error("Error fetching practice problem:", err);
    res.status(500).json({ error: "Failed to fetch practice problem" });
  }
});

app.get("/resources", async (req, res) => {
  try {
    const dbConnected = await connectToMongoDB();
    
    if (dbConnected) {
      const db = client.db("AppDev");
      const collection = db.collection("bootcampSlides");  
      const resources = await collection.find({}).toArray();
      res.json(resources.length > 0 ? resources : dummyResources);
    } else {
      // Use dummy data if DB connection fails
      res.json(dummyResources);
    }
  } catch (err) {
    console.error('Error fetching resources:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get("/api/resources", async (req, res) => {
  try {
    const dbConnected = await connectToMongoDB();
    
    if (dbConnected) {
      const db = client.db("AppDev");
      const collection = db.collection("bootcampSlides");  
      const resources = await collection.find({}).toArray();
      res.json(resources.length > 0 ? resources : dummyResources);
    } else {
      // Use dummy data if DB connection fails
      res.json(dummyResources);
    }
  } catch (err) {
    console.error('Error fetching resources:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create resource route
app.post("/resources", async (req, res) => {
  try {
    const { title, link } = req.body;
    if (!title || !link) {
      return res.status(400).json({ error: "Title and link are required" });
    }
    
    const dbConnected = await connectToMongoDB();
    if (dbConnected) {
      const db = client.db("AppDev");
      const collection = db.collection("bootcampSlides"); 
      const newResource = { title, link };
      const result = await collection.insertOne(newResource);
      res.status(201).json({ 
        ...newResource, 
        _id: result.insertedId 
      });
    } else {
      // Simulate success response with dummy ID
      res.status(201).json({
        title,
        link,
        _id: "dummy-" + Date.now()
      });
    }
  } catch (err) {
    console.error('Error creating resource:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post("/api/resources", async (req, res) => {
  try {
    const { title, link } = req.body;
    if (!title || !link) {
      return res.status(400).json({ error: "Title and link are required" });
    }
    
    const dbConnected = await connectToMongoDB();
    if (dbConnected) {
      const db = client.db("AppDev");
      const collection = db.collection("bootcampSlides"); 
      const newResource = { title, link };
      const result = await collection.insertOne(newResource);
      res.status(201).json({ 
        ...newResource, 
        _id: result.insertedId 
      });
    } else {
      // Simulate success response with dummy ID
      res.status(201).json({
        title,
        link,
        _id: "dummy-" + Date.now()
      });
    }
  } catch (err) {
    console.error('Error creating resource:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(5173, () => {
  console.log(`Server listening on http://localhost:5173`);
});