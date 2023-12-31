import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true },
  redirectUrl: { type: String, required: true },
  visitHis: [{ timestamps: { type: String, required: true } }],
});

const Url = mongoose.model("Url", urlSchema);

export { Url };
