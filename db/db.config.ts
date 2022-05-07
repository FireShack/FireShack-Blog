import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db_cnn = process.env.DB_CNN as string;

export const initDB = async () => {
  try {
    await mongoose.connect(db_cnn).catch(err => console.log(err))
    console.log("All ok");
  } catch (error) {
    console.log("There was an error", error);
  }
};
