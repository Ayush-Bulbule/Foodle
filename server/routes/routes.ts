import express from 'express'
import * as authController from '../app/controllers/authController';
import * as menuController from '../app/controllers/menuController';
import * as restaurantController from '../app/controllers/restaurantController';
import * as homeController from '../app/controllers/homeControllers';
import store from '../app/middlewares/multeradd';
import { authMiddleware } from '../app/middlewares/auth';
const router = express.Router();

// router.get('/', authController.signUp);
//Auth routes
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);
router.get('/refresh', authController.refresh);


//Add Restaurent Routes:
router.post('/addRestaurent', restaurantController.addRestaurent)
router.post('/addMenu', store.single('image'), menuController.addMenu)
router.get('/getAllMenu', menuController.getAllMenu)



//Protected Routes
router.get('/getUsers', authMiddleware, homeController.getUsers);

export default router;