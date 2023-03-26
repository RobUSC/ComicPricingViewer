import * as express from "express";
import * as mongodb from "mongodb";
import {collections} from "./database";

export const itemRouter = express.Router();
itemRouter.use(express.json());

itemRouter.get("/", async (_req, res) => {
  try {
    const items = await collections.items.find(_req.query).toArray();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


itemRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = {_id: new mongodb.ObjectId(id)};
    const item = await collections.items.findOne(query);

    if (item) {
      res.status(200).send(item);
    } else {
      res.status(404).send(`Failed to find an item: ID ${id}`);
    }

  } catch (error) {
    res.status(404).send(`Failed to find an item: ID ${req?.params?.id}`);
  }
});

itemRouter.post("/", async (req, res) => {
  try {
    const item = req.body;
    const result = await collections.items.insertOne(item);

    if (result.acknowledged) {
      res.status(201).send(`Created a new item: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new item.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});


itemRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const item = req.body;
    const query = {_id: new mongodb.ObjectId(id)};
    const result = await collections.items.updateOne(query, {$set: item});

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an item: ID ${id}.`);
    } else if (!result.matchedCount) {
      res.status(404).send(`Failed to find an item: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an item: ID ${id}`);
    }
  } catch (error) {
    // @ts-ignore
    console.error(error.message);
    // @ts-ignore
    res.status(400).send(error.message);
  }
});

itemRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = {_id: new mongodb.ObjectId(id)};
    const result = await collections.items.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed a item: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an item: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an item: ID ${id}`);
    }
  } catch (error) {
    // @ts-ignore
    console.error(error.message);
    // @ts-ignore
    res.status(400).send(error.message);
  }
});
