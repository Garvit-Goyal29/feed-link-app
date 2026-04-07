import donationC from '../controller/donationC.js'
import donationL from '../controller/donationL.js' 
import donateDelete from '../controller/donateDelete.js';
import donationLRequest from '../controller/donationLRequest.js'
import donationLHistory from '../controller/donationLHistory.js'
import acceptRequest from '../controller/acceptRequest.js'
import rejectRequest from '../controller/rejectRequest.js'
import completeRequest from '../controller/completeRequest.js'
import express  from 'express'
const router = express.Router();
router.post('/donate',donationC)
router.get('/',donationL)
router.get('/request',donationLRequest)
router.get('/history',donationLHistory)
router.delete('/:id',donateDelete)
router.post('/acceptRequest',acceptRequest)
router.post('/rejectRequest',rejectRequest)
router.post('/completeRequest',completeRequest)
export default router;
