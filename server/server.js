/** @format */
import express from "express";
import products from "./data/Products.js";
import dotenv from "dotenv";
import connectDataBase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import userRoute from "./Routes/userRoutes.js";
import orderRoute from "./Routes/orderRoutes.js";

import { notFound, errorHandler } from "./Middleware/Error.js";

dotenv.config();
connectDataBase();
const app = express();
app.use(express.json());

// ? API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ? error handler
app.use(notFound);
app.use(errorHandler);

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
