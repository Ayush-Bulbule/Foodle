import Cart, { ICart } from '../models/cart';
import User from '../models/user';
import MenuItem from '../models/menuItem';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/appRequests';



// GET: getCart
export const getCart = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = req.user;

        const cart = await Cart.findOne({ user: user?._id });
        if (!cart) {
            return res.status(204).json({ status: "EMPTY", msg: "Your cart is Empty!!" })
        }

        return res.status(200).json({ cart });
    } catch (err) {
        return res.status(500).json({ msg: err })

    }
}

// GET: getCartItems
export const getCartItems = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = req.user;
        const cart = await Cart.findOne({ user: user?._id });
        if (!cart) {
            return res.status(204).json({ status: "EMPTY", msg: "Your cart is Empty!!" })
        }

        //create a new array of item id's
        const itemIds = cart.items.map((item: any) => item.item);


        //find all items in the items array
        const cartItems = await MenuItem.find({ _id: { $in: itemIds } }); // $in is a mongo operator

        //create a new array of items with quantity
        const cartData: any = cartItems.map((item: any) => {
            console.log("Item Data")
            console.log(item._id)
            const cartItem = cart.items.find((cartItem: any) => cartItem.item.equals(item._id));
            return { item, quantity: cartItem?.quantity }
        })



        return res.status(200).json({ cart: cartData, status: 'success' });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

// POST: addToCart
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
        console.log(cart)
        if (cart?.items) {
            const index = cart.items.findIndex((cartItem: any) => cartItem.item == item);
            if (index >= 0) {
                console.log("Item already exists in cart incrementing quantity")
                console.log(cart.items[index].quantity);
                cart.items[index].quantity += Number(quantity);
            } else {
                console.log("New item being added to cart")
                cart?.items.push({ item, quantity });
            }
            // Save the updated Cart
            await cart.save();
            return res.status(200).json({ cart, status: 'success' });
        }
        else {
            const newCart = new Cart({
                user: user._id,
                items: [{ item, quantity }]
            });
            await newCart.save();
            return res.status(200).json({ newCart, status: 'success' });
        }

    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const deleteCart = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const cart = await Cart.findOne({ user: user?._id });

        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        const index = cart.items.findIndex((cartIndex: any) => cartIndex.item == id)
        if (index >= 0) {
            cart.items.splice(index, 1);  ///At index remove 1 element - splice***
            await cart.save();
        }
        return res.status(200).json({ cart });
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
}




// DELETE: deleteCart