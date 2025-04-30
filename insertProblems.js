import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') });

const uri = process.env.MONGODB_URI;
const databaseAndCollection = { db: "AppDev", collection: "leetCodeProblems" };

async function main() {
    const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    try {
        await client.connect();
       

        /* Inserting multiple movies */
        console.log("***** Inserting leet code problems *****");
        const problemsPath = path.resolve(__dirname, "problems.json"); // adjust path if needed
        const problemsArray = JSON.parse(fs.readFileSync(problemsPath, "utf8"));

        await insertMultipleProblems(client, databaseAndCollection, problemsArray);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function insertMultipleProblems(client, databaseAndCollection, problemsArray) {
    const result = await client.db(databaseAndCollection.db)
        .collection(databaseAndCollection.collection)
        .insertMany(problemsArray);

    console.log(`Inserted ${result.insertedCount} problems`);
}

main().catch(console.error);