import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import donationC from '../controller/donationC.js'
import donationL from '../controller/donationL.js'
import donationLRequest from '../controller/donationLRequest.js'
import donationLHistory from '../controller/donationLHistory.js'
import donateDelete from '../controller/donateDelete.js'
import acceptRequest from '../controller/acceptRequest.js'
import rejectRequest from '../controller/rejectRequest.js'
import completeRequest from '../controller/completeRequest.js'

const router = express.Router()

// All routes require authentication
router.post('/donate',          authMiddleware, donationC)          // Create donation
router.get('/current',          authMiddleware, donationL)          // My current listings
router.get('/pending-requests', authMiddleware, donationLRequest)   // My listings with pending requests
router.get('/history',          authMiddleware, donationLHistory)   // My donation history
router.delete('/:id',           authMiddleware, donateDelete)       // Delete my donation

// Request management — REST: PATCH /:id/action
router.patch('/:id/accept',    authMiddleware, acceptRequest)       // Donor accepts a request
router.patch('/:id/reject',    authMiddleware, rejectRequest)       // Donor rejects a request
router.patch('/:id/complete',  authMiddleware, completeRequest)     // Donor marks as completed

export default router
