import mongoose from "mongoose";

import { Contract } from "./models/Contract.mjs";

export const connectMongo = () => mongoose.connect(process.env.MONGO_URL);

export const disconnectMongo = () => mongoose.disconnect();

export const runDbSeeder = async () => {
  console.log("Mongo: Seed data");
  await Contract.findOneAndUpdate(
    { name: "Contract 1" },
    { name: "Contract 1" },
    { upsert: true }
  );
  console.log("Mongo: Seeded data");
};

mongoose.connection.on("connected", () => {
  console.log("Mongo:", "Connected", process.env.MONGO_URL);
});

mongoose.connection.on("error", async (err) => {
  console.error(err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongo:", "Disconnected");
});
