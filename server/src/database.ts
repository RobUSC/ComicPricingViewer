import * as mongodb from "mongodb";
import {item} from "./item";

export const collections: {
  items?: mongodb.Collection<item>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("EbayPricer");
  await applySchemaValidation(db);

  const itemCollection = db.collection<item>("items");
  collections.items = itemCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "publisher", "series_title", 'issue_number'],
      additionalProperties: true,
      properties: {
        _id: {},
        publisher: {
          bsonType: "string",
          description: "'Publisher' is required and is a string",
        },
        series_title: {
          bsonType: "string",
          description: "'Series Title' is required and is a string",
        },
        issue_number: {
          bsonType: "string",
          description: "'Issue Number' is required and is a string",
        },
      },
    },
  };

  await db.command({
    collMod: "items",
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
      await db.createCollection("items", {validator: jsonSchema});
    }
  });
}
