"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    items: [{
            item: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "MenuItem"
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
    address: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Address"
    },
    status: {
        type: String,
        required: true,
        enum: ["ORDERED", "DELIVERED", "CANCELLED"],
        default: "ORDERED"
    },
    payment: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Payment"
    }
}, {
    timestamps: true
});
