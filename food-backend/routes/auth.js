import signupUser from '../controller/signupC.js'
import signinUser from '../controller/signinC.js';
import express  from 'express'
const router = express.Router();
router.post('/signup',signupUser)
router.post('/signin',signinUser)
export default router;