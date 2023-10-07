import { Router } from "express";
import { Url } from "../models/url";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/url", (req, res) => {});
export { router };
