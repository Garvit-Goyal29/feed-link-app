import donateModel from '../model/donateModel.js';
import Request from '../model/receiverModel.js';
import User from '../model/userModel.js';
import transporter from '../utils/mailer.js';
import {
    acceptRequestTemplate,
    donorConfirmationTemplate
} from '../utils/emailTemplates.js';

async function acceptRequest(req, res) {
    try {
        const { id } = req.body;
        const food = await donateModel.findById(id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }
        const request = await Request.findOne({ foodId: id, status: "pending" });
        if (!request) {
            return res.status(404).json({
                success: false,
                message: "No pending request found for this donation"
            });
        }
        food.status = "accepted";
        await food.save();
        request.status = "accepted";
        await request.save();

        const donorName = food.name;
        const donorEmail = food.email;
        const donorPhone = food.phone;
        const donorLocation = food.location;
        const foodType = food.food;
        const quantity = "As specified in request";
        const foodDescription = food.description;
        const receiver = await User.findOne({ email: request.userEmail });
        const receiverName = receiver ? receiver.name : "Receiver";
        const receiverEmail = request.userEmail;
        const receiverPhone = receiver ? receiver.phone : "N/A";

        let emailSent = true;
        try {
            const receiverProps = {
                receiverName,
                donorName,
                donorEmail,
                donorPhone,
                donorLocation,
                foodType,
                quantity,
                foodDescription
            };

            const donorProps = {
                donorName,
                receiverName,
                receiverEmail,
                receiverPhone,
                foodType,
                quantity,
                foodDescription
            };

            await transporter.sendMail({
                to: request.userEmail,
                subject: "Request Accepted 🎉",
                html: acceptRequestTemplate(receiverProps)
            });

            await transporter.sendMail({
                to: request.donorEmail,
                subject: "You accepted a request",
                html: donorConfirmationTemplate(donorProps)
            });
        } catch (emailErr) {
            console.error("Email sending failed:", emailErr);
            emailSent = false;
        }

        res.status(200).json({
            success: true,
            message: emailSent ? "Request accepted & emails sent" : "Request accepted, but email delivery failed. Check server logs.",
            emailStatus: emailSent ? "sent" : "failed"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
export default acceptRequest;