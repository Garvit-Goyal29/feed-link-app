import express from 'express'
import getMeal from '../controller/getMeal.js'
const Router = express.Router()
Router.get('/getMeal',getMeal);
export default Router;