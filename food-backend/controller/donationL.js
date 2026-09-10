import donateModel from '../model/donateModel.js'
import mongoose from "mongoose";

const donationL = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;
        const filter = { status: "available" };
        if (userId) {
            filter.userId = new mongoose.Types.ObjectId(userId);
        }
        const dataForListing = await donateModel.find(filter);
        res.status(200).json({
            success: true,
            message: "Donation list successful",
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
export default donationL;