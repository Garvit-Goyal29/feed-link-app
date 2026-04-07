import donateModel from '../model/donateModel.js';
import Request from '../model/receiverModel.js';

const rejectRequest = async (req, res) => {
    try {
        const { id } = req.body;

        const donation = await donateModel.findById(id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        // Only allow reject if it was requested
        if (donation.status !== "requested") {
            return res.status(400).json({
                success: false,
                message: "No active request to reject"
            });
        }

        donation.status = "available";
        await donation.save();

        // Also update the receiver request status to "rejected"
        await Request.updateMany(
            { foodId: id, status: "pending" },
            { status: "rejected" }
        );

        res.status(200).json({
            success: true,
            message: "Request rejected successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export default rejectRequest;