import express from "express";
import multer from "multer";

import { uploadProductImage } from "../controllers/upload.controller";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../models/user.model";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    callback(null, allowedTypes.includes(file.mimetype));
  }
});

router.post(
  "/product-image",
  authenticate,
  requireRole([UserRole.ADMIN]),
  upload.single("image"),
  uploadProductImage
);

export default router;