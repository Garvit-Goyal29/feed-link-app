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

        const secret = process.env.JWT_SECRET || 'feed_link_jwt_secret_key_2026_safe';
        const token = jwt.sign(
            { id: userExist._id, email: userExist.email },
            secret,
            { expiresIn: '7d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            token,
            user: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                phone: userExist.phone
            },
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            phone: userExist.phone,
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