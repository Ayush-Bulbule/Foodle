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
exports.deleteCart = exports.addCart = exports.getCart = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const user_1 = __importDefault(require("../models/user"));
// GET: getCart
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const cart = yield cart_1.default.findOne({ user: user === null || user === void 0 ? void 0 : user._id });
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        return res.status(200).json({ cart });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
});
exports.getCart = getCart;
// POST: addToCart
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
        console.log(cart);
        if (cart === null || cart === void 0 ? void 0 : cart.items) {
            const index = cart.items.findIndex((cartItem) => cartItem.item == item);
            if (index >= 0) {
                console.log("Item already exists in cart incrementing quantity");
                console.log(cart.items[index].quantity);
                cart.items[index].quantity += Number(quantity);
            }
            else {
                console.log("New item being added to cart");
                cart === null || cart === void 0 ? void 0 : cart.items.push({ item, quantity });
            }
            // Save the updated Cart
            yield cart.save();
            return res.status(200).json({ cart });
        }
        else {
            const newCart = new cart_1.default({
                user: user._id,
                items: [{ item, quantity }]
            });
            yield newCart.save();
            return res.status(200).json({ newCart });
        }
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
});
exports.addCart = addCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { item } = req.body;
        const cart = yield cart_1.default.findOne({ user: user === null || user === void 0 ? void 0 : user._id });
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        const index = cart.items.findIndex((cartIndex) => cartIndex.item == item);
        if (index >= 0) {
            cart.items.splice(index, 1); ///At index remove 1 element - splice***
            yield cart.save();
        }
        return res.status(200).json({ cart });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
});
exports.deleteCart = deleteCart;
// DELETE: deleteCart
