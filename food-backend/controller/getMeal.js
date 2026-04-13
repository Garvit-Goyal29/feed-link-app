import donateModel from '../model/donateModel.js'
const getMeal = async (req, res) => {
    try {
        const dataForListingMeal = await donateModel.find({status: "accepted" })
        const len = dataForListingMeal.length;
        console.log(len)
        res.status(200).json({
            success: true,
            message: "Donation meal list successfully",
            data:len
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
export default getMeal;