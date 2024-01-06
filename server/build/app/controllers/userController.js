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
exports.updateProfile = exports.getProfile = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
// GET: getUsers
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        console.log("🔴USERS");
        console.log(req.user._id);
        return res.status(200).json({ users });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
});
exports.getUsers = getUsers;
// GET: Profile
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userData = yield user_1.default.findById(user === null || user === void 0 ? void 0 : user._id);
        if (!userData) {
            return res.status(404).send("User not found");
        }
        const { _id, name, email, role, avatar, address, phone } = userData;
        return res.status(200).json({ _id, name, email, role, avatar, address, phone });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
});
exports.getProfile = getProfile;
// PUT : Profile
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { name, email, address, phone } = req.body;
        const userData = yield user_1.default.findById(user === null || user === void 0 ? void 0 : user._id);
        if (!userData) {
            return res.status(404).send("User not found");
        }
        userData.name = name;
        userData.email = email;
        userData.phone = phone;
        userData.address = address;
        yield userData.save();
        return res.status(200).json({ userData });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.updateProfile = updateProfile;
