import { Request, Response } from 'express';

import User from "../models/user";
import { AuthenticatedRequest } from "../types/appRequests";

// GET: getUsers
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

// GET: Profile
export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = req.user;
        const userData = await User.findById(user?._id);

        if (!userData) {
            return res.status(404).send("User not found");
        }

        const { _id, name, email, role, avatar, address, phone } = userData;

        return res.status(200).json({ _id, name, email, role, avatar, address, phone });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

// PUT : Profile
export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = req.user;
        const { name, email, address, phone } = req.body;
        const userData = await User.findById(user?._id);
        if (!userData) {
            return res.status(404).send("User not found");
        }
        userData.name = name;
        userData.email = email;
        userData.phone = phone;
        userData.address = address;
        await userData.save();
        return res.status(200).json({ userData });
    } catch (err) {
        return res.status(500).json(err);
    }
}