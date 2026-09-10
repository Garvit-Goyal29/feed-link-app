import receiverL from '../controller/receiverL.js'
import receiverRequest from '../controller/receiverRequest.js'
import authMiddleware from '../middleware/authMiddleware.js'
import express  from 'express'
const router = express.Router();
router.get('/', receiverL)
router.post('/request', authMiddleware, receiverRequest)
export default router;

