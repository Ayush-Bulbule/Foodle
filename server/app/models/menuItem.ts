import mongoose, { Schema } from "mongoose";

interface IMenuItem {
    name: string;
    image: string;
    price: number;
    description: string;
    veg: boolean;
    category: string;
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
    description: {
        required: true,
        type: String
    },
    veg: {
        required: true,
        type: Boolean
    },
    category: {
        required: true,
        type: String
    },
    restaurant: {
        type: Schema.Types.ObjectId
    }
})


export default mongoose.model<IMenuItem>("MenuItem", menuItemSchema);