"use strict";
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
exports.updateRefreshToken = exports.deleteRefreshToken = exports.verifyRefreshToken = exports.findRefreshToken = exports.verifyAccessToken = exports.storeRefreshToken = exports.generateAccessToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refresh_1 = __importDefault(require("../models/refresh"));
//Generate Both Refresh Token and Access Token
const generateToken = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1h"
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "1y"
    });
    return { accessToken, refreshToken };
};
exports.generateToken = generateToken;
// Method to generate access token 
const generateAccessToken = (payload) => {
    console.log("🔴PAYLOAD");
    console.log(payload);
    console.log(process.env.JWT_ACCESS_SECRET);
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1h"
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
// Method to store refresh token
const storeRefreshToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield refresh_1.default.create({ token, userId });
    }
    catch (err) {
        console.log("🔴ERROR");
        console.log(err);
    }
});
exports.storeRefreshToken = storeRefreshToken;
// Method to verify refresh token
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
//Find Refresh Token (boolean)
const findRefreshToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield refresh_1.default.findOne({ userId, refreshToken });
});
exports.findRefreshToken = findRefreshToken;
//Verify Refresh Tpkem
const verifyRefreshToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
    console.log("Decoded!");
    console.log(decoded);
    console.log(typeof (decoded));
    return decoded;
};
exports.verifyRefreshToken = verifyRefreshToken;
//delete Refresh Token
const deleteRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield refresh_1.default.deleteMany({ userId });
    }
    catch (err) {
        console.log("Error Occured!!");
    }
});
exports.deleteRefreshToken = deleteRefreshToken;
//Update Refresh Token
const updateRefreshToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield refresh_1.default.updateOne({ userId }, { refreshToken });
});
exports.updateRefreshToken = updateRefreshToken;
