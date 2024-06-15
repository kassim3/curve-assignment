import "dotenv/config";
import { connectMongo, disconnectMongo, runDbSeeder } from "./db.mjs";

const run = async () => {
  await connectMongo();
  await runDbSeeder();
  await disconnectMongo();
};

run();
