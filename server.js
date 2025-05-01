import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';
import express from 'express';  // Assuming you're using Express
import bodyParser from 'body-parser'; // For handling request bodies
import cors from 'cors';

// Initialize Express app
const app = express();
const port = process.env.PORT || 5173;
app.use(cors());
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') });

const uri = process.env.MONGODB_URI;
const databaseAndLeetCodeCollection = { db: "AppDev", collection: "leetCodeProblems" };
const databaseAndAssignmentsCollection = { db: "AppDev", collection: "homeworks" };
const databaseAndResourcesCollection = { db: "AppDev", collection: "bootcampSlides" };



// Middleware
app.use(bodyParser.json()); // For parsing JSON request bodies

// Connect to MongoDB
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

app.get("/api/dashboard", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("AppDev");
    const collection = db.collection("homeworks");  // Assuming this is correct
    const assignments = await collection.find({}).toArray();
    res.send(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching assignments");
  } finally {
    await client.close();
  }
});

app.get("/api/assignments", async (req, res) => {
  res.json({ message: "Hello, world!" }); // Simple test response
});

app.get("/api/practice", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(databaseAndLeetCodeCollection.db);
    const collection = db.collection(databaseAndLeetCodeCollection.collection);

    // Fetch a random problem
    const problems = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
    res.send(problems[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch practice problem");
  } finally {
    await client.close();
  }
});

app.get("/api/resources", async (req, res) => {
  try {
    const db = client.db("AppDev");
    const collection = db.collection("bootcampSlides");  
    const resources = await collection.find({}).toArray();
    res.send(resources);
  } catch (err) {
    console.error('Error fetching resources:', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
});

// Create resource route (optional)
app.post("/api/resources", async (req, res) => {
  try {
    const { title, link } = req.body;
    const db = client.db("AppDev");
    const collection = db.collection("bootcampSlides"); 
    const newResource = { title, link };
    await collection.insertOne(newResource);
    res.status(201).json(newResource);
  } catch (err) {
    console.error('Error creating resource:', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
