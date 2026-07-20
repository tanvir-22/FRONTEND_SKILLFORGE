import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

// Cache the client across hot-reloads in dev so we don't open a new
// connection on every module reload.
const globalForMongo = globalThis;

function getClient() {
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri);
  }
  return globalForMongo._mongoClient;
}

export const client = getClient();
export const db = client.db(process.env.MONGODB_DB_NAME || "skillforge");
