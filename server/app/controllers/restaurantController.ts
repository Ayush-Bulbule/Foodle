import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import Restaurant from '../models/restaurant';
import { AuthenticatedRequest } from '../types/appRequests';
import User from '../models/user';

// GET:  All Restaurants.
export const getRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurents = await Restaurant.find();
        return res.status(200).json({ restaurents });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

// GET:  Top Restaurants.
export const getTopRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.find().sort({ rating: -1 }).limit(8);

        res.status(200).json({ restaurants });
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

// GET: Restaurant By Id
export const getRestaurantById = async (req: Request, res: Response) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).send("Please provide id");
        }
        const restaurant = await Restaurant.findById(id);

        return res.status(200).json({ restaurant });
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}


// POST:  Add a Restaurant.
export const addRestaurent = async (req: AuthenticatedRequest, res: Response) => {
    //Extract the User Role
    const id = req.user?._id;
    const user = await User.findById(id);
    // console.log("🔴USER Res");
    // console.log(id);
    // console.log(user);

    //Check User
    if (!user) {
        return res.status(404).send("User not found");
    }
    if (user.role !== 'owner') {
        return res.status(401).send("You are not a restaurant owner");
    }

    //Extract the data from req.body
    let { name, email, phone, image, veg, description, opens, closes, cuisine } = req.body;
    console.log("Restaurant Data");
    console.log(req.body);
    if (!name || !email || !phone || image || !veg || !description || !opens || !closes || !cuisine) {
        return res.status(400).send("Please fill all the details!!");
    }
    //If All Are correct insert it to DB

    //Hash Password
    const restaurant = new Restaurant({
        name,
        email,
        owner: id,
        phone,
        image: req.file?.filename || "https://source.unsplash.com/featured/?indian%20restaurant",
        veg,
        description,
        opens,
        closes,
        cuisine
    });

    try {
        await restaurant.save();
        return res.status(200).json({ res_id: restaurant._id, msg: 'Restaurant Created!' });
    } catch (err) {
        return res.status(500).json({ msg: 'Something went wrong!!', error: err });
    }
}
