import express, { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/appRequests';
import User from "../models/user";

import Cart, { ICart } from '../models/cart';
import Order from '../models/order';
import Address from '../models/address';
import MenuItem from '../models/menuItem';


export const createOrder = async (req: AuthenticatedRequest, res: Response) => {

    const _id = req.user._id;

    const user = await User.findById(_id);
    if (!user) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    if (!user.address) {
        return res.status(400).json({
            error: "Please add address"
        });
    }

    //Now We Have to Create a new Order
    const cart = await Cart.findOne({ "user": user._id });

    if (!cart) {
        return res.status(200).json({ "status": "EMPTY", "msg": "Your cart is Empty!!" });
    }

    //Creating array of ids
    const itemsArr = cart.items.map((cartItem) => cartItem.item);

    //Now Get all the items from the menu Items
    const menuItems = await MenuItem.find({ _id: { $in: itemsArr } });

    //Now check if they are from same restaurant
    const restaurant = menuItems[0].restaurant;
    const sameRestaurant = menuItems.map((menuItem) => menuItem.restaurant.equals(restaurant));

    if (!sameRestaurant) {
        return res.status(400).json({
            status: "DIFFERENT_RESTAURANT", msg: "Your cart contains order from different places! Order from same restaurant is supported at a time!"
        })
    }

    try {

        //Else create new order
        // const order = new Order({
        //     user: user._id,
        //     items: cart.items,
        //     address: user.address,
        //     status: "ORDERED"
        // })

        // await order.save();

        //delete cart
        await Cart.deleteOne({ user: user._id });

        return res.status(201).json({ "status": "ORDER_PLACED", msg: "Order Placed Successfully!" });
    } catch (err) {
        console.log("ERROR: ", err);
        res.send(501).json({ "status": "ERROR", msg: "Error saving order!" })

    }
}
