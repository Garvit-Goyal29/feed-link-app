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
        console.log("Accepting request for donation ID:", id);

        const food = await donateModel.findById(id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        // Find the specific request. If it's already 'accepted', we handle it gracefully.
        let request = await Request.findOne({ foodId: id, status: "pending" });

        if (!request) {
            // Check if it was already accepted (idempotency for retries)
            const alreadyAccepted = await Request.findOne({ foodId: id, status: "accepted" });
            if (alreadyAccepted) {
                return res.status(200).json({
                    success: true,
                    message: "Request was already accepted and confirmed.",
                    emailStatus: "confirmed"
                });
            }

            return res.status(404).json({
                success: false,
                message: "No pending request found for this donation"
            });
        }

        // Update statuses
        food.status = "accepted";
        await food.save();
        request.status = "accepted";
        await request.save();

        console.log("Database updated. Preparing to send emails...");

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
        const receiverPhone = receiver ? (receiver.phone || request.userPhone) : request.userPhone;

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

            // Send emails in parallel to avoid timeout and ensure both are attempted
            await Promise.all([
                transporter.sendMail({
                    from: `"Feed Link" <${process.env.EMAIL_USER}>`,
                    to: receiverEmail,
                    subject: "Request Accepted 🎉",
                    html: acceptRequestTemplate(receiverProps)
                }),
                transporter.sendMail({
                    from: `"Feed Link" <${process.env.EMAIL_USER}>`,
                    to: donorEmail,
                    subject: "You accepted a request",
                    html: donorConfirmationTemplate(donorProps)
                })
            ]);
            
            console.log("Emails sent successfully to:", receiverEmail, "and", donorEmail);
        } catch (emailErr) {
            console.error("Email sending failed:", emailErr);
            emailSent = false;
        }

        res.status(200).json({
            success: true,
            message: emailSent ? "Request accepted & emails sent" : "Request accepted, but email delivery failed. Check your connection or email settings.",
            emailStatus: emailSent ? "sent" : "failed"
        });
    } catch (err) {
        console.error("AcceptRequest Error:", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
export default acceptRequest;