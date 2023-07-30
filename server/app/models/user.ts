import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    address: string;
    phone: string;
    otp: string;
}

const user: Schema = new Schema({
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
        required: true,
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
    role: {
        type: String,
        trim: true,
        default: "customer",
        maxlength: 32
    },
    otp: {
        type: String,
        default: ""
    },
}, { timestamps: true });


export default mongoose.model<IUser>('User', user);