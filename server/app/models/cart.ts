import mongoose, { Schema } from "mongoose";


export interface ICart extends Document {
    user: mongoose.Types.ObjectId;
    items: [{
        item: mongoose.Types.ObjectId;
        quantity: number;
    }]

}

const cartSchema = new mongoose.Schema<ICart>({
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    items: [{
        item: {
            type: mongoose.Types.ObjectId,
            ref: "MenuItem"
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});


export default mongoose.model("Cart", cartSchema);