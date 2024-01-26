import mongoose, { Schema, Document } from 'mongoose';
import { IAddress } from './address';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    address: string;
    phone: string;
    otp: string;
    refreshToken: Array<string>
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        ref: 'Address'
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/599/599305.png"
    },
    otp: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "owner", "rider"]
    },
    refreshToken: [String]

}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
