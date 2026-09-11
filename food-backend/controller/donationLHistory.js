import donateModel from '../model/donateModel.js'

const donationLHistory = async (req, res) => {
    try {
        // Use JWT identity — no longer accepts userId from query string
        const dataForListing = await donateModel.find({
            userId: req.user.id,
            status: { $in: ["accepted", "completed", "expired"] }
        }).sort({ updatedAt: -1 })

        res.status(200).json({
            success: true,
            message: "History fetched successfully",
            data: dataForListing
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export default donationLHistory
