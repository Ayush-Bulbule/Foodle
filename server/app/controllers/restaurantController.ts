import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import Restaurant from '../models/restaurant';
import Menu from '../models/menuItem';
import { AuthenticatedRequest } from '../types/appRequests';
import User, { IUser } from '../models/user';
import mongoose from 'mongoose';
import Address from '../models/address';

// GET:  All Restaurants.
export const getRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurents = await Restaurant.find();
        return res.status(200).json({ restaurents });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}


//GET: Restaurant Details
export const getRestaurantDetails = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send("Please provide id");
        }
        const restaurant = await Restaurant.findById(id).populate('address');

        const menu = await Menu.find({ restaurant: id });

        return res.status(200).json({ restaurant, menu });
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

// GET:  Top Restaurants.
export const getTopRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.find().populate('address').sort({ rating: -1 }).limit(8);

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


//Get Restaurant by User Id
export const getRestaurantByUserId = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const id = req.user?._id;
        const restaurant = await Restaurant.findOne({ owner: id }).populate('address');
        console.log("POPULATE")
        console.log(restaurant)
        return res.status(200).json({ restaurant });
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}


// POST:  Add a Restaurant.
export const addRestaurant = async (req: AuthenticatedRequest, res: Response) => {
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
    if (!name || !email || !phone || !veg || !description || !opens || !closes || !cuisine) {
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



// Update Restaurant Details
export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurantId = req.params.id;
        const updateData = req.body; // Assuming you send the updated data in the request body

        // Validate that the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }

        console.log(req.file);

        console.log("Restaurant Image 📍")
        console.log(req.body.image)

        //If image
        if (req.file) {
            updateData.image = req.file.filename;
        }

        // Find the restaurant by ID and update it
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.status(200).json({ message: 'Restaurant updated successfully', data: updatedRestaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


//PUT: Add restaurant Address
export const updateAddress = async (req: AuthenticatedRequest, res: Response) => {
    try {
        //Extract the restaurant owner id
        const id = req.user?._id;
        //Check User
        if (!id) {
            return res.status(404).send("User not found");
        }
        const user: IUser | null = await User.findById(id); // Await the User.findById() method
        if (user?.role !== 'owner') {
            return res.status(401).send("You are not a restaurant owner");
        }
        //Extract the data from req.body
        let { building, street, locality, city, state, zip } = req.body;


        console.log("Address Data");
        console.log(req.body);
        console.log(id)

        if (!building || !street || !locality || !city || !state || !zip) {
            return res.status(400).send("Please fill all the details!!");
        }

        console.log("Address Data")
        console.log(req.body);

        //If All Are correct insert it to DB
        const address = new Address({
            building,
            street,
            locality,
            city,
            state,
            zip
        });

        // save address
        const restaurant = await Restaurant.findOne({ owner: id });
        console.log("Restaurant FOund :")

        console.log(restaurant)
        //update the restaurant address
        if (!restaurant) {
            return res.status(404).send("Restaurant not found");
        }

        // Save the address
        await address.save();
        //Assign the address to the restaurant 
        restaurant.address = address._id;

        //Save the updated Restaurnt
        await restaurant.save();

        return res.status(201).json({ msg: 'Address added successfully', restaurant, address });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong!!', error: err });
    }
}
