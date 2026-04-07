import mongoose from "mongoose";
const DonationSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String,
            match: /.+\@.+\..+/
        },
        phone: {
            type: String,
            match: /^\d{10}$/
        },
        location: {
            required: true,
            type: String
        },
        food: {
            required: true,
            type: String
        },
        expiryDate: {
            required: true,
            type: Date
        },
        description: {
            required: true,
            type: String
        },
        status: {
            type: String,
            enum: ["available", "requested", "accepted", "completed", "expired"],
            default: "available"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
)

export default mongoose.model("Donation", DonationSchema)