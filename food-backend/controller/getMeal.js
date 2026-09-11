import donateModel from '../model/donateModel.js'

const getMeal = async (req, res) => {
    try {
        const count = await donateModel.countDocuments({
            status: { $in: ["accepted", "completed"] }
        })

        res.status(200).json({
            success: true,
            message: "Meal count fetched successfully",
            data: count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export default getMeal