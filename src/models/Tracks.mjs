import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  version: String,
  artist: String,
  ISRC: {
    type: String,
    required: true,
  },
  pLine: String,
  aliases: [String],
  contractID: {
    type: mongoose.Schema.ObjectId,
    ref: "Contract",
  },
});

export const Contract = mongoose.model("Track", trackSchema);
