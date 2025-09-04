import { Router } from "express";
import Product from "../models/Product.js";
const router = Router();

// GET all products
router.get("/", async (_req, res) => {
  const items = await Product.find().lean();
  res.json(items);
});

// (Optional) CRUD for admin use
router.post("/", async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
});

export default router;
