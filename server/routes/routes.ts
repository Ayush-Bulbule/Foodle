import express from 'express'
import * as authController from '../app/controllers/authController';
const router = express.Router();

// router.get('/', authController.signUp);
//Auth routes
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);

export default router;