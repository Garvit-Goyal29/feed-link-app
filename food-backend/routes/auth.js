import signupUser from '../controller/signupC.js'
import signinUser from '../controller/signinC.js';
import logoutUser from '../controller/logoutC.js';
import getMe from '../controller/getMeC.js';
import authMiddleware from '../middleware/authMiddleware.js';
import express  from 'express'
const router = express.Router();
router.post('/signup', signupUser)
router.post('/signin', signinUser)
router.post('/logout', logoutUser)
router.get('/me', authMiddleware, getMe)
export default router;
