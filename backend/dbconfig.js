import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI;
const dbName = "expense-tracker";
export const collectionName = "Expenses";

const client = new MongoClient(url);

export const connection = async () => {
  const connect = await client.connect();
  console.log("MongoDB Connected!");
  return connect.db(dbName);
};
