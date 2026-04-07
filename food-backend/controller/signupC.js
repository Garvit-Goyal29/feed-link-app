import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
const signupUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.json({
                success: false,
                message: "User already exist!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone
        })
        res.json({
            success: true,
            message: "Signup successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
export default signupUser;