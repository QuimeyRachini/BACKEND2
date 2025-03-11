import express from 'express';
import ProductController from '../controllers/productController.js';
import passport from 'passport';
import { authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
const productController = new ProductController();

router.post('/', passport.authenticate('jwt', { session: false }), authorizeAdmin, productController.createProduct.bind(productController));
router.put('/:id', passport.authenticate('jwt', { session: false }), authorizeAdmin, productController.updateProduct.bind(productController));
router.delete('/:id', passport.authenticate('jwt', { session: false }), authorizeAdmin, productController.deleteProduct.bind(productController));
router.get('/', productController.getProducts.bind(productController));

export default router;