import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') });

const uri = process.env.MONGODB_URI;
const databaseAndCollection = { db: "AppDev", collection: "leetCodeProblems" };

app.get("/api/random-problem", async (req, res) => {
    try {
      await client.connect();
      const db = client.db(databaseAndCollection.db);
      const collection = db.collection(databaseAndCollection.collection);
  
      const problems = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
      res.json(problems[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to fetch problem");
    }
  });
  
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });