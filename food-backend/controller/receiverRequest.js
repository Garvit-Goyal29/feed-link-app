import Request from "../model/receiverModel.js";
import donateModel from "../model/donateModel.js";

const receiverRequest = async (req, res) => {
    try {
        const { id, phone, email } = req.body;

        const food = await donateModel.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        // Update donation status to "requested"
        food.status = "requested";
        await food.save();

        await Request.create({
            foodId: id,
            userEmail: email,
            donorEmail: food.email,
            userPhone: phone
        });

        res.json({ success: true, message: "Request sent" });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
export default receiverRequest;