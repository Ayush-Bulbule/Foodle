import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!, {
            dbName: 'grub'
        })
        console.log("Database Connected!");
    } catch (err) {
        console.log(err + " Error connecting to MongoDB");

    }
}

export default connectDB;


