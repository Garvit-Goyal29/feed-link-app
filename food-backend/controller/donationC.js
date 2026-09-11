import donateModel from '../model/donateModel.js'

const donationC = async (req, res) => {
    try {
        const { phone, location, food, expiryDate, description } = req.body

        const donation = await donateModel.create({
            name: req.user.name,
            email: req.user.email,
            userId: req.user.id,
            phone,
            location,
            food,
            expiryDate,
            description
        })

        res.status(201).json({
            success: true,
            message: "Donation listed successfully",
            donation
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export default donationC