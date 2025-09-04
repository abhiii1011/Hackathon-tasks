import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const data = [
  { title: "Basic Tee", desc: "100% cotton", image: "", price: 19.99 },
  { title: "Hoodie", desc: "Cozy fleece", image: "", price: 39.99 },
  { title: "Cap", desc: "One size", image: "", price: 14.99 },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(data);
  console.log("Seeded!");
  await mongoose.disconnect();
}
run();
