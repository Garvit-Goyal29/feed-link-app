import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.json({
                success: false,
                message: "User does not exist!"
            })
        }
        const isMatch = await bcrypt.compare(password, userExist.password)
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password"
            })
        }
        res.json({
            success: true,
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            phone:userExist.phone,
            message: "Login successful"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
export default signinUser;