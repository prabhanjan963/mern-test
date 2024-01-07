import express from 'express'
import { saveVerifiedEmail, signin, signup } from '../controllers/auth.js';

const routes = express.Router()

routes.post('/signup',signup)
routes.post('/signin',signin)
routes.get('/verify/:token',saveVerifiedEmail)

export default routes;