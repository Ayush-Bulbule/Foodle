import mongoose, { Schema } from 'mongoose';
import { Request, Response } from 'express';
import Menu from '../models/menuItem';
import { AuthenticatedRequest } from '../types/appRequests';


// GET: Get All Menu
export const getAllMenu = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// GET: Get All Menu From Restaurant 
export const getMenuFromRestaurant = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.find({ restaurant: req.params.id });

        if (menu.length === 0) {
            return res.status(404).json({ msg: "No menu found" });
        }
        return res.status(200).json({ menu });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

// GET:  Menu By Id
export const getMenuById = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findById(req.params.id);
        console.log(req.params.id)

        if (!menu) {
            return res.status(404).json({ msg: "No menu found" });
        }
        return res.status(200).json({ menu });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}


// POST: AddMenu
export const addMenu = async (req: AuthenticatedRequest, res: Response) => {

    const id = req.user?._id;

    if (!id) {
        return res.status(401).send("You are not a restaurant owner");
    }
    let { name, price, veg, category, description, restaurant } = req.body;

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
            restaurant
        });

        const savedMenu = await newMenu.save();
        return res.json(savedMenu);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}