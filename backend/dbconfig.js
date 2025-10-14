import { MongoClient } from "mongodb";

const url = "mongodb+srv://expense-user:expense1234@cluster0.f2gjwjm.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0";

const dbName = "expense-tracker";
export const collectionName = "Expenses";

const client = new MongoClient(url);

export const connection = async () => {
  const connect = await client.connect();
  console.log("MongoDB Connected!");
  return connect.db(dbName);
};
