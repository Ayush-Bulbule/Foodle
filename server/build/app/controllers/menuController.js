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
exports.addMenu = exports.getMenuById = exports.getMenuFromRestaurant = exports.getAllMenu = void 0;
const menuItem_1 = __importDefault(require("../models/menuItem"));
// GET: Get All Menu
const getAllMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield menuItem_1.default.find();
        res.json(menu);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getAllMenu = getAllMenu;
// GET: Get All Menu From Restaurant 
const getMenuFromRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield menuItem_1.default.find({ restaurant: req.params.id });
        if (menu.length === 0) {
            return res.status(404).json({ msg: "No menu found" });
        }
        return res.status(200).json({ menu });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
});
exports.getMenuFromRestaurant = getMenuFromRestaurant;
// GET:  Menu By Id
const getMenuById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield menuItem_1.default.findById(req.params.id);
        console.log(req.params.id);
        if (!menu) {
            return res.status(404).json({ msg: "No menu found" });
        }
        return res.status(200).json({ menu });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
});
exports.getMenuById = getMenuById;
// POST: AddMenu
const addMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!id) {
        return res.status(401).send("You are not a restaurant owner");
    }
    let { name, price, veg, category, description, restaurant } = req.body;
    console.log(req.body);
    if (!name || !price || !veg || !category || !description || !restaurant) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    try {
        const newMenu = new menuItem_1.default({
            name,
            image: ((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename) || "",
            price,
            veg,
            category,
            restaurant
        });
        const savedMenu = yield newMenu.save();
        return res.json(savedMenu);
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
});
exports.addMenu = addMenu;
