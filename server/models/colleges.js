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
        // isAdmin: {
        //     type: Boolean,
        //     required: true,
        //     default: false,
        // },
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
        featured: {
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
                    type: String,
                    required: true
                },
                content: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    default: new Date()
                },
            }
        ],
    },
    {
        timestamps: true,
    }
);

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    domain: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    author: {
        type: String,
        required: true,
        // default: {
        //     user: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'User',
        //         required: true
        //     },
        // },
    },
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
    courseSold: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    coursePhoto: {
        type: String,
        required: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAiPcahbfC4iLvexrZuv4Nkp7hC-VWnTJ_jbblJYROB1NLRqxa_TKGL3KOZtpRVAYFCEI&usqp=CAU",
    },
    comments: [
        {
            user: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: new Date()
            },
        }
    ],
    credits: { type: Number, required: true, default: 300 },
});

const College = mongoose.model("College", collegeSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { College, Course };
