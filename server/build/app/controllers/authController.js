"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.resetPassword = exports.forgotPassword = exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const mailService_1 = __importDefault(require("../services/mailService"));
const tokenService = __importStar(require("../services/tokenService"));
//POST - SignUp
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, email, password, avatar, role, address, phone } = req.body;
    if (!name || !email || !password || !address || !phone) {
        console.log('Please enter all fields');
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const user = yield user_1.default.findOne({ email });
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
    const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
    //send mail to verify cusotomrer
    try {
        const newUser = new user_1.default({
            name,
            email,
            password: hashedPassword,
            avatar,
            role,
            address,
            phone
        });
        yield newUser.save();
        res.status(200).json({ user_id: newUser._id, msg: 'User created successfully' });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
});
exports.signUp = signUp;
//POST - LOGIN
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Please enter all fields');
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    //Now find user
    const foundUser = yield user_1.default.findOne({ email });
    if (!foundUser) {
        console.log('User does not exist');
        return res.status(401).json({ msg: 'User does not exist' });
    }
    //compare password
    const isMatch = yield bcrypt_1.default.compareSync(password, foundUser.password);
    if (isMatch) {
        console.log('🚀 ~ file: authController.ts ~ line 119 ~ login ~ foundUser', foundUser);
        //generate token
        const { accessToken, refreshToken } = yield tokenService.generateToken({ _id: foundUser._id });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        });
        res.cookie('accessToken', accessToken, {
            secure: false,
            maxAge: 1000 * 60 * 60, //1hr
        });
        console.log("Login  Successfull");
        //Store the token
        tokenService.storeRefreshToken(foundUser._id, refreshToken);
        //!!remove token from response later
        return res.status(200).json({ "UserInfo": { id: foundUser._id, name: foundUser.name, email: foundUser.email, phone: foundUser.phone }, "accessToken": accessToken, "refreshToken": refreshToken });
    }
    else {
        return res.status(400).json({ msg: 'Incorrect Password' });
    }
});
exports.login = login;
//POST - ForgotPassword
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    //Now find user
    const user = yield user_1.default.findOne({ email });
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
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;
    yield (0, mailService_1.default)(to, subject, html);
    //save otp to user
    user.otp = otp.toString();
    yield user.save();
    (0, mailService_1.default)(to, subject, html);
    res.status(200).json({ msg: 'Email sent successfully' });
});
exports.forgotPassword = forgotPassword;
//POST - Reset Password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, password } = req.body;
    if (!otp || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    //Now find user
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    if (!(otp == user.otp)) {
        return res.status(400).json({ msg: 'OTP is not correct' });
    }
    user.otp = '';
    //update password
    user.password = bcrypt_1.default.hashSync(password, 8);
    user.save();
    return res.status(200).json({ msg: 'OTP is correct' });
});
exports.resetPassword = resetPassword;
const refresh = (req, res) => {
    //get the refresh token from the cookies
    let userData;
    console.log("🔴REFRESH :");
    console.log(req.cookies);
    if (req.cookies) {
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        try {
            userData = tokenService.verifyRefreshToken(refreshTokenFromCookie);
            console.log(userData);
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({ msg: 'Invalid refresh token' });
        }
        //check if token is in DB
        try {
            const foundToken = tokenService.findRefreshToken(userData._id, refreshTokenFromCookie);
            console.log("Token is present in the memory: " + foundToken);
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
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({ msg: 'Invalid refresh token' });
        }
    }
    return res.status(401).json({ msg: 'Invalid refresh token' });
};
exports.refresh = refresh;
