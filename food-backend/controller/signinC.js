import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

        const token = jwt.sign(
            { id: userExist.id, email: userExist.email },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
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