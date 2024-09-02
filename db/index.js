import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../utils/Const.js";

async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.DB_CONNECTION_STRING}/${DB_NAME}`);
  } catch (error) {
    console.log("Cannot connect to DB: \n" + error);
  }
}

export default connectToDatabase;
