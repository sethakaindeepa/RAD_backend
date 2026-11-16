import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import crypto from "crypto";

export const uploadProductImage = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a valid image."
      });
    }

    const file = req.file;

    const extensionMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp"
    };

    const extension = extensionMap[file.mimetype];

    if (!extension) {
      return res.status(400).json({
        message: "Only JPG, PNG and WebP images are allowed."
      });
    }

    const fileName = `${crypto.randomUUID()}.${extension}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      console.error("Supabase upload error:", error);

      return res.status(500).json({
        message: "Failed to upload image."
      });
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return res.status(200).json({
      message: "Image uploaded successfully.",
      imageUrl: data.publicUrl,
      path: filePath
    });

  } catch (error) {
    console.error("Image upload error:", error);

    return res.status(500).json({
      message: "Something went wrong while uploading the image."
    });
  }
};