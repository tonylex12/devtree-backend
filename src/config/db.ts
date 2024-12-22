import moongose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await moongose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
