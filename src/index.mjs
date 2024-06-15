import "dotenv/config";
import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("Established Mongoose Default Connection");
});

mongoose.connection.on("error", async (err) => {
  console.error(err);
});

const run = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  await mongoose.disconnect();
};

run();
