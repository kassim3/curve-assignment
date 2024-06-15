import mongoose from "mongoose";

import { Contract } from "./models/Contracts.mjs";

export const connectMongo = () => mongoose.connect(process.env.MONGO_URL);

export const disconnectMongo = () => mongoose.disconnect();

export const runDbSeeder = async () => {
  await Contract.findOneAndUpdate({}, { name: "Contract 1" }, { upsert: true });
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
