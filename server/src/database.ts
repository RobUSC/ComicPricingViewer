import * as mongodb from "mongodb";
import {item} from "./item";

export const collections: {
  comics?: mongodb.Collection<item>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("meanStackExample");
  await applySchemaValidation(db);

  const itemCollection = db.collection<item>("items");
  collections.comics = itemCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "Publisher", "Series Title", 'Issue Number'],
      additionalProperties: true,
      properties: {
        _id: {},
        Publisher: {
          bsonType: "string",
          description: "'Publisher' is required and is a string",
        },
        'Series Title': {
          bsonType: "string",
          description: "'Series Title' is required and is a string",
        },
        'Issue Number': {
          bsonType: "string",
          description: "'Issue Number' is required and is a string",
        },
      },
    },
  };

  await db.command({
    collMod: "comics",
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
      await db.createCollection("comics", {validator: jsonSchema});
    }
  });
}
