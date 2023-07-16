import { MongoClient } from "mongodb";
// conn.mjs
// Initializes MongoDB connection, and exports the object as db

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("test");

export default db;