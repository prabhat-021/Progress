const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const verificationTokenSchema = mongoose.Schema(
    {
        owner: {
            type: String,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            expires: 3600,
            default: Date.now(),
        }
    },
    {
        timestampToken:true
    }
);

verificationTokenSchema.pre("save", async function (next) {

    if (!this.isModified("token")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.token = await bcrypt.hash(this.token, salt);

});

verificationTokenSchema.methods.matchToken = async function (enteredToken) {

    return await bcrypt.compare(enteredToken, this.token);

}

const User = mongoose.model("VerificationToken", verificationTokenSchema);

module.exports = User;