import mongoose from "mongoose";
const requestSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation"
  },
  userEmail: String,
  donorEmail: String,
  userPhone: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
});
export default mongoose.model("receivers", requestSchema)