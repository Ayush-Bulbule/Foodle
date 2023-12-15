import mongoose, { Schema } from "mongoose";

export interface IRestaurant extends Document {
    name: string,
    email: string,
    phone: string,
    address: mongoose.Types.ObjectId,
    password: string,
    avatar: string,
    veg: boolean,
    description: string,
    opens: string,
    closes: string,
    rating: number,
}

const restaurantSchema = new Schema<IRestaurant>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    veg: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    opens: {
        type: String
    },
    closes: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);