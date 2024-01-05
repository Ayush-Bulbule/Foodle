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
exports.addRestaurent = exports.getRestaurantById = exports.getTopRestaurants = exports.getRestaurants = void 0;
const restaurant_1 = __importDefault(require("../models/restaurant"));
const user_1 = __importDefault(require("../models/user"));
// GET:  All Restaurants.
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurents = yield restaurant_1.default.find();
        return res.status(200).json({ restaurents });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
});
exports.getRestaurants = getRestaurants;
// GET:  Top Restaurants.
const getTopRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurant_1.default.find().sort({ rating: -1 }).limit(8);
        res.status(200).json({ restaurants });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
});
exports.getTopRestaurants = getTopRestaurants;
// GET: Restaurant By Id
const getRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).send("Please provide id");
        }
        const restaurant = yield restaurant_1.default.findById(id);
        return res.status(200).json({ restaurant });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
});
exports.getRestaurantById = getRestaurantById;
// POST:  Add a Restaurant.
const addRestaurent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //Extract the User Role
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const user = yield user_1.default.findById(id);
    // console.log("🔴USER Res");
    // console.log(id);
    // console.log(user);
    //Check User
    if (!user) {
        return res.status(404).send("User not found");
    }
    if (user.role !== 'owner') {
        return res.status(401).send("You are not a restaurant owner");
    }
    //Extract the data from req.body
    let { name, email, phone, image, veg, description, opens, closes, cuisine } = req.body;
    console.log("Restaurant Data");
    console.log(req.body);
    if (!name || !email || !phone || image || !veg || !description || !opens || !closes || !cuisine) {
        return res.status(400).send("Please fill all the details!!");
    }
    //If All Are correct insert it to DB
    //Hash Password
    const restaurant = new restaurant_1.default({
        name,
        email,
        owner: id,
        phone,
        image: ((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename) || "https://source.unsplash.com/featured/?indian%20restaurant",
        veg,
        description,
        opens,
        closes,
        cuisine
    });
    try {
        yield restaurant.save();
        return res.status(200).json({ res_id: restaurant._id, msg: 'Restaurant Created!' });
    }
    catch (err) {
        return res.status(500).json({ msg: 'Something went wrong!!', error: err });
    }
});
exports.addRestaurent = addRestaurent;
