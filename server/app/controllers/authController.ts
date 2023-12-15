
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/user';
import sendMail from '../services/mailService';
import * as tokenService from '../services/tokenService';
import user from '../models/user';

//POST - SignUp
export const signUp = async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, email, password, avatar, role, address, phone } = req.body;
    if (!name || !email || !password || !address || !phone) {
        console.log('Please enter all fields');
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const user = await User.findOne({ email });
    if (user) {
        console.log('User already exists');
        return res.status(400).json({ msg: 'User already exists' });
    }


    if (password.length < 6) {
        console.log('Password must be at least 6 characters');
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
        res.status(200).json({ user_id: newUser._id, msg: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ msg: err })
    }

}

//POST - LOGIN
export const login = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    console.log(req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Please enter all fields');
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    //Now find user
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        console.log('User does not exist');
        return res.status(401).json({ msg: 'User does not exist' });
    }

    //compare password
    const isMatch = await bcrypt.compareSync(password, foundUser.password);
    if (isMatch) {
        console.log(
            '🚀 ~ file: authController.ts ~ line 119 ~ login ~ foundUser',
            foundUser
        );

        //generate token
        const { accessToken, refreshToken } = await tokenService.generateToken({ _id: foundUser._id });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        });

        res.cookie('accessToken', accessToken, {
            secure: false,
            maxAge: 1000 * 20,
        });

        console.log("Login  Successfull")

        //!!remove token from response later
        return res.status(200).json({ "UserInfo": { id: foundUser._id, name: foundUser.name, email: foundUser.email, phone: foundUser.phone }, "accessToken": accessToken, "refreshToken": refreshToken });

    } else {
        return res.status(400).json({ msg: 'Incorrect Password' });
    }
}

//POST - ForgotPassword
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

//POST - Reset Password
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

export const refresh = (req: Request, res: Response) => {
    //get the refresh token from the cookies
    let userData: any;
    console.log("🔴REFRESH :");
    console.log(req.cookies)
    if (req.cookies) {

        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        try {
            userData = tokenService.verifyRefreshToken(refreshTokenFromCookie);
            console.log(userData);
        } catch (err) {
            console.log(err);
            return res.status(401).json({ msg: 'Invalid refresh token' });
        }
        //check if token is in DB
        try {
            const foundToken = tokenService.findRefreshToken(userData._id, refreshTokenFromCookie);
            console.log("Token is present in the memory: " + foundToken)
            if (!foundToken) {
                return res.status(40).json({ msg: 'Invalid refresh token' });
            }
            //if valid, generate new access token
            const accessToken = tokenService.generateAccessToken({ _id: userData._id });
            //send new access token as response
            res.cookie('accessToken', accessToken, {
                secure: false,
                maxAge: 1000 * 20,
            });
            return res.status(200).json({ accessToken });
        } catch (err) {
            console.log(err);
            return res.status(401).json({ msg: 'Invalid refresh token' });
        }
    }
    return res.status(401).json({ msg: 'Invalid refresh token' });
};