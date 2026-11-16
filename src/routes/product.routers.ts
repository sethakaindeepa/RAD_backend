
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


router.get("/",getAllProducts);
  
  

router.get("/active",getActiveProducts);
  
  

router.get("/:id",getProductById);
  
  


router.put("/:id",
  authenticate,
  requireRole([UserRole.ADMIN]), 
  updateProduct);


router.delete("/:id",
  authenticate,
  requireRole([UserRole.ADMIN]),
  deleteProduct);

export default router;
