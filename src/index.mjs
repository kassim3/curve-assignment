import "dotenv/config";
import { connectMongo, disconnectMongo, runDbSeeder } from "./db.mjs";
import { runImport } from "./import/index.mjs";

const run = async () => {
  await connectMongo();
  await runDbSeeder();
  await runImport();
  await disconnectMongo();
};

run();
