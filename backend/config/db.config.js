import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB Connected Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error("Full Error:", err);
  }
};

export default connectToDb;