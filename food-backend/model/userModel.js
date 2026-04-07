import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            match: /^\d{10}$/
        }
    }
)
export default mongoose.model("User",userSchema)