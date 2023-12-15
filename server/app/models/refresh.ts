import mongoose from "mongoose";
interface IRefresh extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    token: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
const refreshSchema = new mongoose.Schema<IRefresh>(
    {
        token: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Refresh = mongoose.model("Refresh", refreshSchema);

export default Refresh;