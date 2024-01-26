import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import Refresh from "../models/refresh";
import { IUser } from "../models/user";

interface IPayload extends JwtPayload {
    _id: string;
    exp: number;
    iat: number;
}
//Generate Both Refresh Token and Access Token
export const generateToken = (payload: any) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "1h"
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: "1y"
    });

    return { accessToken, refreshToken };
}

// Method to generate access token 
export const generateAccessToken = (payload: any) => {
    console.log("🔴PAYLOAD")
    console.log(payload)
    console.log(process.env.JWT_ACCESS_SECRET!)
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "1h"
    });
    return accessToken;
}

// Method to store refresh token
export const storeRefreshToken = async (userId: ObjectId, token: string) => {
    try {
        await Refresh.create({ token, userId });
    } catch (err) {
        console.log("🔴ERROR");
        console.log(err);
    }
}

// Method to verify refresh token
export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
}

//Find Refresh Token (boolean)
export const findRefreshToken = async (userId: any, refreshToken: string) => {
    return await Refresh.findOne({ userId, refreshToken });
}

//Verify Refresh Tpkem
export const verifyRefreshToken = (token: string) => {
    const decoded: IPayload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as IPayload;
    console.log("Decoded!")
    console.log(decoded)
    console.log(typeof (decoded))
    return decoded;
}

//delete Refresh Token
export const deleteRefreshToken = async (userId: string) => {
    try {
        await Refresh.deleteMany({ userId });
    } catch (err) {
        console.log("Error Occured!!");
    }
}

//Update Refresh Token
export const updateRefreshToken = async (userId: string, refreshToken: string) => {
    return await Refresh.updateOne({ userId }, { refreshToken });
}