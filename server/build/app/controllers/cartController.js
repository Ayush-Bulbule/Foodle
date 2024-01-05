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
exports.addCart = exports.getUsers = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const user_1 = __importDefault(require("../models/user"));
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
const addCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    const { item, quantity } = req.body;
    if (!item || !quantity) {
        return res.status(400).send("Please fill all the details!!");
    }
    try {
        const user = yield user_1.default.findById(req.user._id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Await the result of Cart.findOne and ensure its type is ICart or null
        const cart = yield cart_1.default.findOne({ user: user._id });
        if (cart === null || cart === void 0 ? void 0 : cart.items) {
            const index = cart.items.findIndex((cartItem) => cartItem.item == item);
            if (index >= 0) {
                cart.items[index].quantity += quantity;
            }
            else {
                cart === null || cart === void 0 ? void 0 : cart.items.push({ item, quantity });
            }
        }
        else {
            const newCart = new cart_1.default({
                user: user._id,
                items: [{ item, quantity }]
            });
            yield newCart.save();
        }
        return res.status(200).json({ cart });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
});
exports.addCart = addCart;
