
import express from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getActiveProducts
} from "../controllers/product.controller";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../models/user.model";

const router = express.Router();


router.post("/", 
  authenticate,
  requireRole([UserRole.ADMIN]), 
  createProduct);


router.get("/",
  authenticate,
  requireRole([UserRole.ADMIN,UserRole.CUSTOMER]), 
  getAllProducts);

router.get("/active",
  authenticate,
  requireRole([UserRole.ADMIN,UserRole.CUSTOMER]),
  getActiveProducts);

router.get("/:id",
  authenticate,
  requireRole([UserRole.ADMIN,UserRole.CUSTOMER]),
  getProductById);


router.put("/:id",
  authenticate,
  requireRole([UserRole.ADMIN]), 
  updateProduct);


router.delete("/:id",
  authenticate,
  requireRole([UserRole.ADMIN]),
  deleteProduct);

export default router;
