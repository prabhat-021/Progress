const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`mongodb://localhost:27017`)
        console.log(`MongoDb Connected To ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDb;