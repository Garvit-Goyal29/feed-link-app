import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

        const secret = process.env.JWT_SECRET || 'feed_link_jwt_secret_key_2026_safe';
        const token = jwt.sign(
            { id: user._id, email: user.email },
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
            message: "Signup successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        })
    } catch (err) {
        console.log("Signup error:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Server error"
        });
    }
}
export default signupUser;