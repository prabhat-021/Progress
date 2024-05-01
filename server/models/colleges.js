const mongoose = require("mongoose");

const collegeSchema = mongoose.Schema(
    {
        collegeName: {
            type: String,
            required: true,
        },
        code: { type: String, required: true, unique: true },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 1
        },
        ratingCount: {
            type: Number,
            required: true,
            default: 1 // Changed default value to 1
        },
        description: {
            type: String,
            required: true,
        },
        information: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        collegePhoto: {
            type: String,
            required: true,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAiPcahbfC4iLvexrZuv4Nkp7hC-VWnTJ_jbblJYROB1NLRqxa_TKGL3KOZtpRVAYFCEI&usqp=CAU",
        },
        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
        verified: {
            type: Boolean,
            required: true,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                content: {
                    type: [String],
                    default: [],
                },
                createdAt: {
                    type: Date,
                    default: new Date()
                },
            }
        ], // Array of comments
    },
    {
        timestamps: true,
    }
);

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    domain: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    information: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 1
    },
    ratingCount: {
        type: Number,
        required: true,
        default: 1 // Changed default value to 1
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            content: {
                type: [String],
                default: [],
            },
            createdAt: {
                type: Date,
                default: new Date()
            },
        }
    ], // Array of comments
    credits: { type: Number, required: true },
});

const College = mongoose.model("College", collegeSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { College, Course };
