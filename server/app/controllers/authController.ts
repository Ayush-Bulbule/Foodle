
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import sendMail from '../services/mailService';

export const signUp = async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, email, password, avatar, role, address, phone } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: 'User already exists' });
    }

    if (!name || !email || !password || !address || !phone) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    //encrypt password
    const saltRounds = 8;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    //send mail to verify cusotomrer
    try {

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar,
            role,
            address,
            phone
        });

        await newUser.save();
        res.status(200).json({ msg: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ msg: err })
    }

}

export const login = async (req: Request, res: Response) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Now find user
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(400).json({ msg: 'User does not exist' });
    }

    //compare password
    const isMatch = await bcrypt.compareSync(password, foundUser.password);

    if (isMatch) {
        console.log(
            '🚀 ~ file: authController.ts ~ line 119 ~ login ~ foundUser',
            foundUser
        );

        //Token
        const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, process.env.JWT_SECRET!, {
            expiresIn: '2 days',
        });

        return res.status(200).json({ user: { id: foundUser._id, name: foundUser.name, email: foundUser.email, phone: foundUser.phone }, token: token });
    } else {
        return res.status(400).json({ msg: 'Incorrect Password' });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Now find user
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    //send mail to reset password
    const to = user.email;
    const subject = 'Reset Your Password';
    // const html = htmlForgotPassword(user.name, otp.toString()); //Future
    const html = `<p>Hi ${user.name},</p>
    <p>Here is your OTP: <b>${otp}</b></p>
    <p>Thanks,</p>
    <p>Team Grub</p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`

    await sendMail(to, subject, html);

    //save otp to user
    user.otp = otp.toString();
    await user.save();

    sendMail(to, subject, html);
    res.status(200).json({ msg: 'Email sent successfully' });
}



export const resetPassword = async (req: Request, res: Response) => {
    const { email, otp, password } = req.body;

    if (!otp || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Now find user
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }

    if (!(otp == user.otp)) {
        return res.status(400).json({ msg: 'OTP is not correct' });
    }

    user.otp = '';
    //update password
    user.password = bcrypt.hashSync(password, 8);
    user.save();

    return res.status(200).json({ msg: 'OTP is correct' });
}
