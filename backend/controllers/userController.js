import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import MentorModel from "../models/mentorModel.js";
import MeetingModel from "../models/MeetingModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";
import razorpay from 'razorpay';

// // Gateway Initialize
// const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// })

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        if (imageFile) {

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL, name, phone, address: JSON.parse(address), dob, gender });

        } else {
            await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book Meeting 
const bookMeeting = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await MentorModel.findById(docId).select("-password")

        if (!docData.available) {
            return res.json({ success: false, message: 'Mentor Not Available' })
        }

        let slots_booked = docData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete docData.slots_booked

        const MeetingData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newMeeting = new MeetingModel(MeetingData)
        await newMeeting.save()

        // save new slots data in docData
        await MentorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Meeting Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel Meeting
const cancelMeeting = async (req, res) => {
    try {

        const { userId, MeetingId } = req.body
        const MeetingData = await MeetingModel.findById(MeetingId)

        // verify Meeting user 
        if (MeetingData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await MeetingModel.findByIdAndUpdate(MeetingId, { cancelled: true })

        // releasing Mentor slot 
        const { docId, slotDate, slotTime } = MeetingData

        const MentorData = await MentorModel.findById(docId)

        let slots_booked = MentorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await MentorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Meeting Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user Meetings for frontend my-Meetings page
const listMeeting = async (req, res) => {
    try {

        const { userId } = req.body
        const Meetings = await MeetingModel.find({ userId })

        res.json({ success: true, Meetings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// // API to make payment of Meeting using razorpay
// const paymentRazorpay = async (req, res) => {
//     try {

//         const { MeetingId } = req.body
//         const MeetingData = await MeetingModel.findById(MeetingId)

//         if (!MeetingData || MeetingData.cancelled) {
//             return res.json({ success: false, message: 'Meeting Cancelled or not found' })
//         }

//         // creating options for razorpay payment
//         const options = {
//             amount: MeetingData.amount * 100,
//             currency: process.env.CURRENCY,
//             receipt: MeetingId,
//         }

//         // creation of an order
//         const order = await razorpayInstance.orders.create(options)

//         res.json({ success: true, order })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// // API to verify payment of razorpay
// const verifyRazorpay = async (req, res) => {
//     try {
//         const { razorpay_order_id } = req.body
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

//         if (orderInfo.status === 'paid') {
//             await MeetingModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
//             res.json({ success: true, message: "Payment Successful" })
//         }
//         else {
//             res.json({ success: false, message: 'Payment Failed' })
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// // API to make payment of Meeting using Stripe
// const paymentStripe = async (req, res) => {
//     try {

//         const { MeetingId } = req.body
//         const { origin } = req.headers

//         const MeetingData = await MeetingModel.findById(MeetingId)

//         if (!MeetingData || MeetingData.cancelled) {
//             return res.json({ success: false, message: 'Meeting Cancelled or not found' })
//         }

//         const currency = process.env.CURRENCY.toLocaleLowerCase()

//         const line_items = [{
//             price_data: {
//                 currency,
//                 product_data: {
//                     name: "Meeting Fees"
//                 },
//                 unit_amount: MeetingData.amount * 100
//             },
//             quantity: 1
//         }]

//         const session = await stripeInstance.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&MeetingId=${MeetingData._id}`,
//             cancel_url: `${origin}/verify?success=false&MeetingId=${MeetingData._id}`,
//             line_items: line_items,
//             mode: 'payment',
//         })

//         res.json({ success: true, session_url: session.url });

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// const verifyStripe = async (req, res) => {
//     try {

//         const { MeetingId, success } = req.body

//         if (success === "true") {
//             await MeetingModel.findByIdAndUpdate(MeetingId, { payment: true })
//             return res.json({ success: true, message: 'Payment Successful' })
//         }

//         res.json({ success: false, message: 'Payment Failed' })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookMeeting,
    listMeeting,
    cancelMeeting,
    // paymentRazorpay,
    // verifyRazorpay,
    // paymentStripe,
    // verifyStripe
}