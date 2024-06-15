import { Schema, model } from "mongoose";

const contractSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Contract = model("Contract", contractSchema);
