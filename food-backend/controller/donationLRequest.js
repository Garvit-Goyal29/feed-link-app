import donateModel from '../model/donateModel.js'
import mongoose from "mongoose";
const donationLRequest = async (req, res) => {
    try {
        const { userId } = req.query;
        const dataForListing  = await donateModel.find({status: "requested",userId:new mongoose.Types.ObjectId(userId)  })
        res.status(200).json({
            success: true,
            message: "Requested food list successful",
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
export default donationLRequest;