import {Router} from "express"
import Product from "../models/product.model"

const router = Router()

router.get("/", async (_req, res) => {
    try{
        const products = await Product.find({ isActive:true });
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    }catch (error){
        res.status(500).json({
            success: false,
            message: "Failed to retrieve products"
        });
    }
});

router.post("/", async (req, res) => {
    try{
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Toy added successfully",
            data: product,
        })
    }catch (error){
        res.status(400).json({
            success: false,
            message: "Failed to add toy. Check the provided data."
        });
    }
});

export default router;