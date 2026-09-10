import donationC from '../controller/donationC.js'
import donationL from '../controller/donationL.js' 
import donateDelete from '../controller/donateDelete.js';
import donationLRequest from '../controller/donationLRequest.js'
import donationLHistory from '../controller/donationLHistory.js'
import acceptRequest from '../controller/acceptRequest.js'
import rejectRequest from '../controller/rejectRequest.js'
import completeRequest from '../controller/completeRequest.js'
import authMiddleware from '../middleware/authMiddleware.js'
import express  from 'express'
const router = express.Router();

router.post('/donate', authMiddleware, donationC)
router.get('/', donationL)
router.get('/request', authMiddleware, donationLRequest)
router.get('/history', authMiddleware, donationLHistory)
router.delete('/:id', authMiddleware, donateDelete)
router.post('/acceptRequest', authMiddleware, acceptRequest)
router.post('/rejectRequest', authMiddleware, rejectRequest)
router.post('/completeRequest', authMiddleware, completeRequest)
export default router;

