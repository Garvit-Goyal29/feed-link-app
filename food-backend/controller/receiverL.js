import donateModel from '../model/donateModel.js'
const receiverL = async (req, res) => {
    try {
        // Exclude donations listed by the current user themselves
        const dataForListing = await donateModel.find({
            status: "available",
            userId: { $ne: req.user.id }
        })
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
export default receiverL;