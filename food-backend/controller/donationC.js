import donateModel from '../model/donateModel.js'
const donationC = async (req, res) => {
    try {
        const { name, email, phone, location, food, expiryDate, description, userId } = req.body;
        const donation = await donateModel.create({
            name,
            email,
            phone,
            location,
            food,
            expiryDate,
            description,
            userId
        });
        res.status(201).json({
            success: true,
            message: "Donation list successful",
            donation
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
export default donationC;