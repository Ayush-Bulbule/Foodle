import mongoose from "mongoose";


interface IPayment extends Document {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorypay_signature: string;
}

const paymentSchema = new mongoose.Schema({

    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorypay_signature: {
        type: String,
        required: true
    }
})



export default mongoose.model<IPayment>("Payment", paymentSchema);