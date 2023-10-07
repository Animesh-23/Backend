import mongoose from "mongoose";
import express from "express";
import { router } from "./routes/url";
import cors from "cors";
const app = express();

mongoose.connect("mongodb://localhost:27017/url");

app.use("/", router);
app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log("server is running ");
});
