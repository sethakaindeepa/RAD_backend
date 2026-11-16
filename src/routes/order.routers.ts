import { Router } from "express";
import { createOrder } from "../controllers/order.controller";
import { getMyOrders } from "../controllers/order.controller";
import { getOrderById } from "../controllers/order.controller";
import { authenticate } from "../middleware/auth";

const OrderRouter = Router();

OrderRouter.post("/", authenticate, createOrder);
OrderRouter.get("/my-orders", authenticate, getMyOrders);
OrderRouter.get("/:id", authenticate, getOrderById);
export default OrderRouter;