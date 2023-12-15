import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import Restaurant from '../models/restaurant';


// name: string,
// email: string,
// phone: string,
// address: mongoose.Types.ObjectId,
// password: string,
// avatar: string,
// veg: boolean,
// description: string,
// opens: Date,
// closes: Date,
// rating: number,

export const addRestaurent = async (req: Request, res: Response) => {
    let { name, email, phone, password, avatar, veg, description, opens, closes } = req.body;
    if (!name || !email || !phone || !password || !veg || !description || !opens || !closes) {
        return res.status(400).send("Please fill all the details!!");
    }
    //If All Are correct insert it to DB
    if (!avatar) {
        avatar = `https://ui-avatars.com/api/?name=${name}`
    }
    //Hash Password
    const saltRounds = 8;
    const hashedPassword = bcrypt.hash(password, saltRounds)
    const restaurant = new Restaurant({
        name,
        email,
        phone,
        password,
        avatar,
        veg,
        description,
        opens,
        closes
    });

    try {
        await restaurant.save();
        return res.status(200).json({ res_id: restaurant._id, msg: 'Restaurant Created!' });
    } catch (err) {
        return res.status(500).json({ msg: 'Something went wrong!!', error: err });
    }
}
