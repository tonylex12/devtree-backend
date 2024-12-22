import moongose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const conn = await moongose.connect(process.env.MONGO_URI);
    console.log(
      colors.magenta.bold(
        `MongoDB connected: ${conn.connection.host}:${conn.connection.port}`
      )
    );
  } catch (error) {
    console.log(colors.red.bold(error.message));
    process.exit(1);
  }
};
