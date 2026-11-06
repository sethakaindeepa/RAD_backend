
import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model";



export const createProduct = async (req: Request,res: Response): Promise<void> => {
   try {
    const {name,description,price,category,stock,image} = req.body;

   if (!name ||!description ||price === undefined ||!category ||stock === undefined ||!image) {
      res.status(400).json({
        message: "All product fields are required"
      });
      return;
    }
 
    const newProduct = new Product({name,description,price,category,stock,image});
      const savedProduct = await newProduct.save();

      res.status(201).json({
      message: "Product created successfully",
      product: savedProduct
    });
       } catch (error) {
      res.status(500).json({
      message: "Failed to create product",
      error: error instanceof Error
        ? error.message
        : "Unknown error"
    });
  }
};
      
export const getAllProducts = async (req: Request,res: Response): Promise<void> => {
      try {
    const products = await Product.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Products retrieved successfully",
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve products",
      error: error instanceof Error
        ? error.message
        : "Unknown error"
    });
  }
};
      
export const getProductById = async (req: Request, res: Response): Promise<void> => {
     try {
    const { id } = req.params;

    
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        message: "Invalid product ID"
      });
      return;
    }
    
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        message: "Product not found"
      });
      return;
    }
res.status(200).json({
      message: "Product retrieved successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve product",
      error: error instanceof Error
        ? error.message
        : "Unknown error"
    });
  }
};
    
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
    const { id } = req.params;

    
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        message: "Invalid product ID"
      });
      return;
    }
      
    const allowedFields = ["name","description","price","category","stock","image"];
      const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        message: "No valid fields provided for update"
      });
      return;
    }
      
      
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      res.status(404).json({
        message: "Product not found"
      });
      return;
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
      error: error instanceof Error
        ? error.message
        : "Unknown error"
    });
  }
};
      
export const deleteProduct = async (req: Request,res: Response): Promise<void> => {
       try {
            const { id } = req.params;

    
            if (!mongoose.isValidObjectId(id)) {
                res.status(400).json({
                message: "Invalid product ID"
                });
                return;
              }
            const deletedProduct = await Product.findByIdAndUpdate(
             id,
            { isActive: false },
            { new: true }
            );

            if (!deletedProduct) {
            res.status(404).json({
            message: "Product not found"
            });
            return;
            }

            res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
            });

            } catch (error) {
            res.status(500).json({
            message: "Failed to delete product",
            error: error instanceof Error
            ? error.message
            : "Unknown error"
            });
            }
            };

     

    
    
      
      
      
      
      
     
   

    
    

 





  
  

  





  
 

  

    
    

    





  
 

 

    
    
      
      
      
      
      
     
    

   
    

   




  
  

 

    
    