import donateModel from '../model/donateModel.js';

const completeRequest = async (req, res) => {
    try {
        const { id } = req.body;
        const donation = await donateModel.findById(id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        donation.status = "completed";
        await donation.save();

        res.status(200).json({
            success: true,
            message: "Donation marked as completed! ✅"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export default completeRequest;
