import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";

export const createOrder = async (req: Request,res: Response) => {
  
  try {
    const { items, paymentMethod, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order items are required",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method is required",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    
    const userId = (req as any).user.sub;

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await ProductModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product ${item.productId} not found`,
        });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({
          message: "Quantity must be greater than 0",
        });
      }

      
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const subtotal = product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal,
      });

      totalAmount += subtotal;

     
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await OrderModel.create({
      userId,
      items: orderItems,
      totalAmount,
      paymentMethod,
      paymentStatus: "PENDING",
      status: "PENDING",
      shippingAddress,
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Failed to place order",
    });
  }
};
  


export const getMyOrders = async (req: Request,res: Response) => {
  try {
    const userId = (req as any).user.sub;

    const orders = await OrderModel
      .find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to retrieve orders",
    });
  }
};
  

  

export const getOrderById = async (req: Request,res: Response) => {
  try {
    const userId = (req as any).user.sub;
    const { id } = req.params;

    const order = await OrderModel.findOne({
      _id: id,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order retrieved successfully",
      order,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve order",
    });
  }
};
  

 