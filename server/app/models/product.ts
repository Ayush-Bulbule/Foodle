import { Schema } from "inspector";
import mongoose from "mongoose";

interface IProduct {
    name: string;
    image: string;
    price: number;
    veg: boolean;
    category: string;
    description: string;
    rating: number;
    numReviews: number;
    countInStock: number;
}

const productSchema = new mongoose.Schema<IProduct>({
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
    }
})


export default mongoose.model<IProduct>("Product", productSchema);