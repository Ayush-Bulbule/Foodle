import Cart, { ICart } from '../models/cart';
import User from '../models/user';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/appRequests';


export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const users = await User.find();
        console.log("🔴USERS");
        console.log(req.user._id);
        return res.status(200).json({ users });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const addCart = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    console.log(user);
    const { item, quantity } = req.body;
    if (!item || !quantity) {
        return res.status(400).send("Please fill all the details!!");
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Await the result of Cart.findOne and ensure its type is ICart or null
        const cart = await Cart.findOne({ user: user._id });
        if (cart?.items) {
            const index = cart.items.findIndex((cartItem: any) => cartItem.item == item);
            if (index >= 0) {
                cart.items[index].quantity += quantity;
            } else {
                cart?.items.push({ item, quantity });
            }
        }
        else {
            const newCart = new Cart({
                user: user._id,
                items: [{ item, quantity }]
            });
            await newCart.save();
        }
        return res.status(200).json({ cart });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}


