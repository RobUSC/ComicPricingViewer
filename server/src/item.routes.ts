import * as express from "express";
import * as mongodb from "mongodb";
import {collections} from "./database";

export const itemRouter = express.Router();
itemRouter.use(express.json());

itemRouter.get("/", async (_req, res) => {
  try {
    // @ts-ignore
    const comics = await collections.comics.find({}).toArray();
    res.status(200).send(comics);
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
});


itemRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = {_id: new mongodb.ObjectId(id)};
    // @ts-ignore
    const comic = await collections.comics.findOne(query);

    if (comic) {
      res.status(200).send(comic);
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
    // @ts-ignore
    const result = await collections.comics.insertOne(item);

    if (result.acknowledged) {
      res.status(201).send(`Created a new item: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new item.");
    }
  } catch (error) {
    console.error(error);
    // @ts-ignore
    res.status(400).send(error.message);
  }
});


itemRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const item = req.body;
    const query = {_id: new mongodb.ObjectId(id)};
    // @ts-ignore
    const result = await collections.comics.updateOne(query, {$set: item});

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
    // @ts-ignore
    const result = await collections.comics.deleteOne(query);

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
