import express from 'express'
import * as authController from '../app/controllers/authController'
import * as menuController from '../app/controllers/menuController'
import * as restaurantController from '../app/controllers/restaurantController'
import * as cartController from '../app/controllers/cartController'
import * as userController from '../app/controllers/userController'
import * as orderController from '../app/controllers/orderController'
import * as paymentController from '../app/controllers/paymentController'
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
//after login
router.post('/logout', authController.logout)

/* Restaurant Routes */
router.get('/getRestaurantById', restaurantController.getRestaurantById)
router.get('/getRestaurantDetails/:id', restaurantController.getRestaurantDetails)
router.get('/getRestaurantByUserId', authMiddleware, restaurantController.getRestaurantByUserId)
router.get('/getAllRestaurants', restaurantController.getRestaurants)
router.get('/getTopRestaurants', restaurantController.getTopRestaurants)
router.post('/addRestaurant', authMiddleware, store.single('image'), restaurantController.addRestaurant)
router.put('/updateRestaurant/:id', authMiddleware, store.single('image'), restaurantController.updateRestaurant)
router.put('/updateAddress', authMiddleware, restaurantController.updateAddress);


/* Menu Routes */
router.get('/getMenuById/:id', menuController.getMenuById)
router.get('/getAllMenu', menuController.getAllMenu)
router.get('/getMenuFromRestaurant', menuController.getMenuFromRestaurant)
router.post('/addMenu', authMiddleware, store.single('image'), menuController.addMenu)


//User: Protected Routes
router.get('/getProfile', authMiddleware, userController.getProfile)
router.put('/updateProfile', authMiddleware, userController.updateProfile)
router.get('/getUsers', userController.getUsers)

//Cart Routes
router.get('/getCart', authMiddleware, cartController.getCart)
router.get('/getCartData', authMiddleware, cartController.getCartItems)
router.delete('/deleteCart/:id', authMiddleware, cartController.deleteCart)
router.post('/addToCart', authMiddleware, cartController.addCart)


//Order ROutes
router.get("/checkout", authMiddleware, orderController.createOrder);


//Payment Routes
router.post("/pay", authMiddleware, paymentController.addPayment);
router.post("/paymentverification", authMiddleware, paymentController.verifyPayment);
router.get("/getPayKey", authMiddleware, paymentController.getKey)



export default router;