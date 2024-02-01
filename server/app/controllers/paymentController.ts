import { Response } from "express"
import razorpay from "razorpay";
import crypto from "crypto";
import { AuthenticatedRequest } from "../types/appRequests";
import Payment from "../models/payment";
import { createOrder } from "./orderController";
import Order, { IOrder } from "../models/order";
import Cart from "../models/cart";

const instance = new razorpay({
    key_id: process.env.RZP_KEY_ID!,
    key_secret: process.env.RZP_KEY_SECRET!
});

export const addPayment = async (req: AuthenticatedRequest, res: Response) => {
    console.log(req.body)

    try {
        //get order id
        const id = req.body.order_id;
        const consumerOrder: IOrder | null = await Order.findById(id);
        if (!consumerOrder) {
            return res.status(404).json({ "msg": "Order not available!!" });
        }

        const options = {
            amount: Number(consumerOrder?.amount * 100),
            currency: "INR",
        }
        //create rzp order
        const order = await instance.orders.create(options);

        if (!order) return res.status(500).json({ "msg": "Something went wrong!" })

        return res.status(201).json({
            "success": true,
            "order": order
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "INTERNAL ERR", msg: "Something went wrong!!" })
    }

}

export const verifyPayment = async (req: AuthenticatedRequest, res: Response) => {
    //this will be called by razorpay it's a webhook
    try {
        console.log("Verify PAy")


        console.log(req.body);


        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, ourOrderId } = req.body;

        const body = razorpayOrderId + "|" + razorpayPaymentId;

        const expectedSignature = crypto.createHmac('sha256', process.env.RZP_KEY_SECRET!).update(body.toString()).digest('hex');

        const isAuth = expectedSignature === razorpaySignature;


        if (isAuth) {
            try {
                const payment = await Payment.create({
                    razorpay_order_id: razorpayOrderId,
                    razorpay_payment_id: razorpayPaymentId,
                    razorpay_signature: razorpaySignature
                });

                const order = await Order.findById(ourOrderId);

                if (!order) {
                    return res.status(404).json({ "msg": "Order Not Found!!" })
                }

                if (!payment._id) {
                    return res.status(404).json({ "msg": "Error creating Payment!!" })
                }

                order.payment = payment._id!;

                await order?.save();

                console.log("Modify Order Here!")

                console.log(payment._id);

                //empty cart
                const cart = await Cart.deleteOne({ user: req.user._id });


                ///redirect to /payment/success
                return res.status(200).json({ "msg": "Payment Successfull" })
            } catch (err) {
                console.log(err)
                return res.status(400).json({ "msg": "Error in creating order" })
            }
        } else {
            return res.status(400).json({
                "success": false,
                "message": "Payment Failed"
            })
        }
    } catch (err) {
        console.log("Error")
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong!!!" })
    }

}

export const getKey = async (req: AuthenticatedRequest, res: Response) => {
    return res.status(200).json({
        key: process.env.RZP_KEY_ID
    })
}


