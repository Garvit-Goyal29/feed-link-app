import donateModel from '../model/donateModel.js'
import Request from '../model/receiverModel.js'
import User from '../model/userModel.js'

const donationLRequest = async (req, res) => {
    try {
        // Get all donations by this donor that have been requested
        const donations = await donateModel.find({
            userId: req.user.id,
            status: "requested"
        })

        // For each donation, find the pending receiver request and look up the receiver's name
        const enriched = await Promise.all(
            donations.map(async (donation) => {
                const request = await Request.findOne({ foodId: donation._id, status: "pending" })
                let receiverName = "Unknown"
                if (request?.userEmail) {
                    const user = await User.findOne({ email: request.userEmail })
                    if (user) receiverName = user.name
                }
                return {
                    ...donation.toObject(),
                    receiverName
                }
            })
        )

        res.status(200).json({
            success: true,
            message: "Requested food list fetched successfully",
            data: enriched
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export default donationLRequest