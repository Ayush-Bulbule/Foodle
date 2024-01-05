"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        console.log(file);
        const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        console.log(ext);
        cb(null, "img" + '-' + Date.now() + ext);
    }
});
const store = (0, multer_1.default)({ storage: storage });
exports.default = store;
