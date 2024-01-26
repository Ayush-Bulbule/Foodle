import mongoose from 'mongoose'
//Yet to implement
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    items: [{
        item: {
            type: mongoose.Types.ObjectId,
            ref: "MenuItem"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    address: {
        type: mongoose.Types.ObjectId,
        ref: "Address"
    },
    status: {
        type: String,
        required: true,
        enum: ["ORDERED", "DELIVERED", "CANCELLED"],
        default: "ORDERED"
    },
    payment: {
        type: mongoose.Types.ObjectId,
        ref: "Payment"
    }
}, {
    timestamps: true
});