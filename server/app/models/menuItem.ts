import mongoose, { Schema } from "mongoose";

interface IMenuItem {
    name: string;
    image: string;
    price: number;
    veg: boolean;
    category: string;
    description: string;
    rating: number;
    numReviews: number;
    countInStock: number;
    restaurant: mongoose.Types.ObjectId;
}

const menuItemSchema = new mongoose.Schema<IMenuItem>({
    name: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    veg: {
        required: true,
        type: Boolean
    },
    category: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    rating: {
        required: true,
        default: 0,
        type: Number
    },
    numReviews: {
        required: true,
        default: 0,
        type: Number
    },
    countInStock: {
        default: 0,
        type: Number
    },
    restaurant: {
        type: Schema.Types.ObjectId
    }
})


export default mongoose.model<IMenuItem>("MenuItem", menuItemSchema);