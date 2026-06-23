import express, { Router } from "express";
import {
  addproduct,
  deleteproduct,
  productlist,
  updateProduct,
} from "../controllers/productController.js";
import { upload } from "../middlewere/multerConfig.js";
import authUser from "../middlewere/authUser.js";
import isAdmin from "../middlewere/authAdmin.js";

const productRouter = express.Router();

// Sirf Admin hi product add kar payega
productRouter.post(
  "/add-product",
  isAdmin,
  upload.single("productImage"),
  addproduct,
);
productRouter.put(
  "/update-product/:id",
  isAdmin,
  upload.single("productImage"),
  updateProduct,
);
productRouter.delete("/delete-product/:id",isAdmin, deleteproduct);
// User sirf list dekh payega
productRouter.get("/product-list", productlist);

export default productRouter;
