import express from 'express'
import * as authController from '../app/controllers/authController'
import * as menuController from '../app/controllers/menuController'
import * as restaurantController from '../app/controllers/restaurantController'
import * as userController from '../app/controllers/cartController'
import store from '../app/middlewares/multeradd';
import { authMiddleware } from '../app/middlewares/auth'
const router = express.Router()

// router.get('/', authController.signUp);npm run devnpmnpm run dev
//Auth routes
router.post('/register', authController.signUp)
router.post('/login', authController.login)
router.post('/forgotpassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)
router.get('/refresh', authController.refresh)

/* Restaurant Routes */
router.get('/getRestaurantById', restaurantController.getRestaurantById)
router.get('/getAllRestaurants', restaurantController.getRestaurants)
router.get('/getTopRestaurants', restaurantController.getTopRestaurants)
router.post('/addRestaurant', authMiddleware, store.single('image'), restaurantController.addRestaurent)

/* Menu Routes */
router.get('/getMenuById/:id', menuController.getMenuById)
router.get('/getAllMenu', menuController.getAllMenu)
router.get('/getMenuFromRestaurant', menuController.getMenuFromRestaurant)
router.post('/addMenu', authMiddleware, store.single('image'), menuController.addMenu)

//Protected Routes
router.get('/getUsers', authMiddleware, userController.getUsers);
router.get('/getCart', authMiddleware, userController.getCart);
router.delete('/deleteCart', authMiddleware, userController.deleteCart);
router.post('/addToCart', authMiddleware, userController.addCart);



export default router;