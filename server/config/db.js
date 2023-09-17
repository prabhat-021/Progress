const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected To ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDb;