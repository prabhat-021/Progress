import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    await mongoose.connect(`mongodb://0.0.0.0:27017`)

}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.