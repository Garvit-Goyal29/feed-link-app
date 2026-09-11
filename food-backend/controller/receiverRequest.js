import Request from "../model/receiverModel.js";
import donateModel from "../model/donateModel.js";

const receiverRequest = async (req, res) => {
    try {
        const { id } = req.body;

        const food = await donateModel.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        // Block user from requesting their own donation
        if (food.userId.toString() === req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot request your own donation"
            });
        }

        // Update donation status to "requested"
        food.status = "requested";
        await food.save();

        // Use JWT identity for receiver info — no trusting client-sent email/phone
        await Request.create({
            foodId: id,
            userEmail: req.user.email,
            donorEmail: food.email,
            userPhone: req.user.phone
        });

        res.status(201).json({ success: true, message: "Request sent" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export default receiverRequest;