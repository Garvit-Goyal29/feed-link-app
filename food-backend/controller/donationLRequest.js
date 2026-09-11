import donateModel from '../model/donateModel.js'

const donationLRequest = async (req, res) => {
    try {
        // Use JWT identity — no longer accepts userId from query string
        const dataForListing = await donateModel.find({
            userId: req.user.id,
            status: "requested"
        })

        res.status(200).json({
            success: true,
            message: "Requested food list fetched successfully",
            data: dataForListing
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export default donationLRequest