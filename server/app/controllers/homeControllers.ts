import User from '../models/user';
import { Request, Response } from 'express';


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}


