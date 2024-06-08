import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";

const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
    "/", protect,
    asyncHandler(async (req, res) => {
        const { orderItems } = req.params;

        if (!orderItems) {
            res.status(400);
            throw new Error("No order items");
        } else {
            let findOrder = await Order.findOne({ user: req.user._id, isPaid: false });
            
            if (findOrder) {
                if (findOrder.orderItems.includes(orderItems)) {
                    res.status(200).json({
                        message: 'Khóa học đã tồn tại trong khỏi giỏ hàng',
                        data: findOrder
                    })
                }
                else {
                    findOrder.orderItems.push(orderItems)

                    await findOrder.save();
                    res.status(200).json({
                        message: 'Đã thêm vào giỏ hàng thành công',
                        data: findOrder
                    })
                }
            }
            else {
                const order = new Order({
                    orderItems,
                    user: req.user._id,
                });

                const createOrder = await order.save();
                res.status(201).json({
                    message: 'Đã thêm vào giỏ hàng thành công',
                    data: createOrder
                });
            }
        }
    })
);

// ADMIN GET ALL ORDERS
orderRouter.get(
    "/all",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const orders = await Order.find({})
            .sort({ _id: -1 })
            .populate("user", "id name email");
        res.json(orders);
    })
);
// USER LOGIN ORDERS
orderRouter.get(
    "/",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
        res.json(order);
    })
);

// Get gio hang
orderRouter.get("/cart", protect,
    asyncHandler(async (req, res) => {
        const cart = await Order.findOne({ user: req.user._id, isPaid: false }).populate('orderItems', '_id name image price categoty foodList').lean()

        const totalPrice = cart.orderItems.reduce((total, course) => total + course.price, 0);
        res.json({ ...cart, totalPrice })
    })
)

// GET ORDER BY ID
orderRouter.get(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    })
);

// ORDER IS PAID
orderRouter.put(
    "/:id/pay",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    })
);

// ORDER IS PAID
orderRouter.put(
    "/:id/delivered",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    })
);

export default orderRouter;
