/** @format */
import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/productModel.js";

const productRoute = express.Router();

// ? GETTING ALL PRODUCTS
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// ? GETTING SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found with such id");
    }
  })
);

export default productRoute;
