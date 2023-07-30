import mongoose, { Schema } from "mongoose";

interface IRestaurant {
    name: string,
    email: string,
    phone: string,
    address: string,
    password: string,
    avatar: string,
    veg: boolean,
    description: string,
    hours: string,
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
    hours: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },

});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);