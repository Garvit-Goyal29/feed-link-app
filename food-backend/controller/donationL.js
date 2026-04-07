import donateModel from '../model/donateModel.js'
import mongoose from "mongoose";
const donationL = async (req, res) => {
    try {
        const { userId } = req.query;
        const dataForListing  = await donateModel.find({status: "available",userId:new mongoose.Types.ObjectId(userId)  })
        res.status(200).json({
            success: true,
            message: "Donation list successful",
            data:dataForListing
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