const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const resetTokenSchema = mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
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

resetTokenSchema.pre("save", async function (next) {

    if (!this.isModified("token")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.token = await bcrypt.hash(this.token, salt);

});

resetTokenSchema.methods.matchToken = async function (enteredToken) {

    return await bcrypt.compare(enteredToken, this.token);

}

const User = mongoose.model("ResetToken", resetTokenSchema);

module.exports = User;