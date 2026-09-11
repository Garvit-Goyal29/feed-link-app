import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './dbConfig.js'
import authRoutes from './routes/auth.js'
import donationRoutes from './routes/donation.js'
import receiverRoutes from './routes/receiver.js'
import homeRoutes from './routes/home.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/auth',     authRoutes)
app.use('/api/donation', donationRoutes)
app.use('/api/receiver', receiverRoutes)
app.use('/api',          homeRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
