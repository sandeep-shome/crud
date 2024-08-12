import mongoose from "mongoose";
import "dotenv/config";

export const dbCon = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Database connection established");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
