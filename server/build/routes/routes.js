"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../app/controllers/authController"));
const menuController = __importStar(require("../app/controllers/menuController"));
const restaurantController = __importStar(require("../app/controllers/restaurantController"));
const cartController = __importStar(require("../app/controllers/cartController"));
const userController = __importStar(require("../app/controllers/userController"));
const multeradd_1 = __importDefault(require("../app/middlewares/multeradd"));
const auth_1 = require("../app/middlewares/auth");
const router = express_1.default.Router();
// router.get('/', authController.signUp);npm run devnpmnpm run dev
//Auth routes
router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);
router.get('/refresh', authController.refresh);
/* Restaurant Routes */
router.get('/getRestaurantById', restaurantController.getRestaurantById);
router.get('/getAllRestaurants', restaurantController.getRestaurants);
router.get('/getTopRestaurants', restaurantController.getTopRestaurants);
router.post('/addRestaurant', auth_1.authMiddleware, multeradd_1.default.single('image'), restaurantController.addRestaurent);
/* Menu Routes */
router.get('/getMenuById/:id', menuController.getMenuById);
router.get('/getAllMenu', menuController.getAllMenu);
router.get('/getMenuFromRestaurant', menuController.getMenuFromRestaurant);
router.post('/addMenu', auth_1.authMiddleware, multeradd_1.default.single('image'), menuController.addMenu);
//Protected Routes
router.get('/getProfile', auth_1.authMiddleware, userController.getProfile);
router.put('/updateProfile', auth_1.authMiddleware, userController.updateProfile);
router.get('/getUsers', auth_1.authMiddleware, userController.getUsers);
//Cart Routes
router.get('/getCart', auth_1.authMiddleware, cartController.getCart);
router.delete('/deleteCart', auth_1.authMiddleware, cartController.deleteCart);
router.post('/addToCart', auth_1.authMiddleware, cartController.addCart);
exports.default = router;
