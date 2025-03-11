import express from 'express';
import CartController from '../controllers/cartController.js';
import passport from 'passport';
import { authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();
const cartController = new CartController();

router.post('/add', passport.authenticate('jwt', { session: false }), authorizeUser, cartController.addProductToCart.bind(cartController));
router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), authorizeUser, cartController.purchaseCart.bind(cartController));

export default router;