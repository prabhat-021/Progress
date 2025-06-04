import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected To ${connect.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit();
    }
}

export default connectDB;
