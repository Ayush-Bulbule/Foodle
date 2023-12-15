import mongoose from 'mongoose'

export interface IAddress extends Document {
    house: String,
    street: String,
    locality: String,
    landmark: String,
    city: String,
    state: String,
    zip: Number
}

const addressSchema = new mongoose.Schema<IAddress>({
    house: {
        types: String,
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
    landmark: {
        type: String
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