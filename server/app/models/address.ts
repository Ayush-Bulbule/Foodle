import mongoose, { Schema } from 'mongoose'

export interface IAddress extends Document {
    _id: mongoose.Types.ObjectId,
    building: String,
    street: String,
    locality: String,
    city: String,
    state: String,
    zip: Number
}

const addressSchema = new Schema<IAddress>({
    building: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
});


export default mongoose.model<IAddress>("Address", addressSchema);