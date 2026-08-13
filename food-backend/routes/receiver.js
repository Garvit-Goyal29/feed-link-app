import receiverL from '../controller/receiverL.js'
import receiverRequest from '../controller/receiverRequest.js'
import express  from 'express'
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware, receiverL)
router.post('/request', authMiddleware, receiverRequest)
export default router;
