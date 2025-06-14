import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: 'https://res.cloudinary.com/prabhat021/image/upload/v1749916864/OIP_uu8lcl.jpg' },
    phone: { type: String, default: '000000000' },
    address: { type: Object, default: { line1: '', line2: '' } },
    gender: { type: String, default: 'Not Selected' },
    dob: { type: String, default: 'Not Selected' },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

}

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
