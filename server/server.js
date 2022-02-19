/** @format */
import express from "express";
import products from "./data/Products.js";
import dotenv from "dotenv";
import connectDataBase from "./config/MongoDb.js";

dotenv.config();
connectDataBase();

const app = express();

// ? load products from server
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ? fetch single product from server
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.get("/", (req, res) => {
  res.send("API running .....");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running on port ${PORT} ....`));
