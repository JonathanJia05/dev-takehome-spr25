import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    throw new Error("MONGO_URL is not defined in the environment variables");
  }
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
