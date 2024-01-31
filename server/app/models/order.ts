import mongoose, { Mongoose } from 'mongoose'

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    items: [{
        item: mongoose.Types.ObjectId;
        quantity: number;
    }],
    address: string;
    status: string;
    payment: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;
}

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
        type: String,
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
    },


}, {
    timestamps: true
});



export default mongoose.model<IOrder>('Order', orderSchema);