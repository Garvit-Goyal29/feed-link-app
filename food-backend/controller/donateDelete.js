import donateModel from "../model/donateModel.js";

const donateDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await donateModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Donation deleted successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export default donateDelete;