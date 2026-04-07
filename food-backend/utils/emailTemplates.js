export const acceptRequestTemplate = (props) => {
    const {
        receiverName,
        donorName,
        donorEmail,
        donorPhone,
        donorLocation,
        foodType,
        quantity,
        foodDescription
    } = props;

    return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #28a745;">✅ Your Request Has Been Accepted!</h2>
        <p>Hello <b>${receiverName}</b>,</p>
        <p>Good news! Your food request has been accepted 🎉</p>
        <hr />
        <h3 style="color: #007bff;">👨‍🍳 Donor Details</h3>
        <p><b>Name:</b> ${donorName}</p>
        <p><b>Email:</b> <a href="mailto:${donorEmail}">${donorEmail}</a></p>
        <p><b>Contact:</b> ${donorPhone}</p>
        <p><b>Location:</b> ${donorLocation}</p>
        <h3 style="color: #007bff;">🍛 Food Details</h3>
        <p><b>Food Type:</b> ${foodType}</p>
        <p><b>Quantity:</b> ${quantity}</p>
        <p><b>Description:</b> ${foodDescription}</p>
        <p style="margin-top:20px; background: #fff3cd; padding: 10px; border-radius: 5px;">
            📞 <b>Crucial:</b> Please contact the donor as soon as possible for pickup.
        </p>
    </div>
    `;
};

export const donorConfirmationTemplate = (props) => {
    const {
        donorName,
        receiverName,
        receiverEmail,
        receiverPhone,
        foodType,
        quantity,
        foodDescription
    } = props;

    return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #007bff;">🍱 Food Request Confirmed</h2>
        <p>Hello <b>${donorName}</b>,</p>
        <p>You have accepted a request! Please connect with the receiver to finalize the handover.</p>
        <hr />
        <h3 style="color: #28a745;">👤 Receiver Details</h3>
        <p><b>Name:</b> ${receiverName}</p>
        <p><b>Contact:</b> <span style="font-size: 1.1em; color: #d9534f;"><b>${receiverPhone}</b></span></p>
        <p><b>Email:</b> <a href="mailto:${receiverEmail}">${receiverEmail}</a></p>
        <hr />
        <h3>🍛 Donation Summary</h3>
        <p><b>Food Type:</b> ${foodType}</p>
        <p><b>Quantity:</b> ${quantity}</p>
        <p><b>Note:</b> ${foodDescription}</p>
        <p style="margin-top:20px;">🙏 Thank you for your generosity!</p>
    </div>
    `;
};
