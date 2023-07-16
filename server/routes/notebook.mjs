import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
// notebook.mjs
// Contains all the methods for the routes for notebooks

const router = express.Router();


// Get all notebooks
router.get("/", async (req, res) => {
  let collection = await db.collection("notebooks");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get single notebook by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("notebooks");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Create notebook
router.post("/", async (req, res) => {
  let newnotebook = {
    title: req.body.title,
    content: ''
  };
  let collection = await db.collection("notebooks");
  let result = await collection.insertOne(newnotebook);
  res.send(result).status(204);
});

// Update notebook by id
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      title: req.body.title,
      content: req.body.content
    }
  };

  let collection = await db.collection("notebooks");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// Delete notebook by id
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("notebooks");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;