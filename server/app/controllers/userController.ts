import { Request, Response } from 'express';
import * as tokenService from '../services/tokenService';

import User from "../models/user";
import { AuthenticatedRequest } from "../types/appRequests";

// GET: getUsers
export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const users = await User.find();

        res.cookie('eshop', 'eshop', {
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        console.log("🔴USERS");
        // // console.log(req.user._id);
        // const accessToken = tokenService.generateAccessToken({ _id: '6597e2d76114e27efaa59c67' });
        // //send new access token as response
        // res.cookie('accessToken', accessToken, {
        //     secure: false,
        //     maxAge: 1000 * 20,
        // });
        //-
        const { accessToken, refreshToken } = await tokenService.generateToken({ _id: '6597e2d76114e27efaa59c67' });

        console.log("🔴TOKENS: ")
        console.log(accessToken);
        console.log(refreshToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 20, // 7d
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60,//1hr

        });

        res.cookie("test", "test", {
            secure: false,
            maxAge: 1000 * 20,
        });

        return res.status(200).json({ users });
    } catch (err) {
        console.log("Errror: ")
        console.log(err)
        return res.status(500).json({ msg: err });
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
