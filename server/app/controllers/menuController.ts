import mongoose, { Schema } from 'mongoose';
import { Request, Response } from 'express';
import Menu from '../models/menuItem';
// name: string;
//     image: string;
//     price: number;
//     veg: boolean;
//     category: string;
//     description: string;
//     rating: number;
//     numReviews: number;
//     countInStock: number;
//     restaurant: mongoose.Types.ObjectId;
export const addMenu = async (req: Request, res: Response) => {
    let { name, price, veg, category, description, rating, numReviews, countInStock, restaurant } = req.body;

    console.log(req.body);
    if (!name || !price || !veg || !category || !description || !restaurant) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    try {
        const newMenu = new Menu({
            name,
            image: req.file?.filename || "",
            price,
            veg,
            category,
            description,
            rating,
            numReviews,
            countInStock,
            restaurant
        });

        const savedMenu = await newMenu.save();
        res.json(savedMenu);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

//Get All Menu
export const getAllMenu = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

//get 
export const getMenuByRestaurant = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.find({ restaurant: req.params.id });
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
