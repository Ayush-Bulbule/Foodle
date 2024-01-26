import mongoose, { Schema } from "mongoose";

export interface IRestaurant extends Document {
    _id: mongoose.Types.ObjectId,
    name: string,
    email: string,
    owner: mongoose.Types.ObjectId,
    phone: string,
    address: mongoose.Types.ObjectId | null,
    image: string,
    veg: boolean,
    description: string,
    opens: string,
    closes: string,
    rating: number,
    cuisine: [string]
}

const restaurantSchema = new Schema<IRestaurant>({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
        type: Schema.Types.ObjectId,
        ref: 'Address',
        default: null,
    },
    image: {
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
    cuisine: {
        type: [String],
        default: []
    }
});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);