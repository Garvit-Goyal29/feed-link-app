import donateModel from '../model/donateModel.js'
import mongoose from "mongoose";

const donationLHistory = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }
        
        const dataForListing = await donateModel.find({
            status: { $in: ["accepted", "completed", "expired"] },
            userId: new mongoose.Types.ObjectId(userId)
        }).sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            message: "History fetched successful",
            data: dataForListing
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export default donationLHistory;
