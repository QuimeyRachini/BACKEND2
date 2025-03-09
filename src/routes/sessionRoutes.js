import express from 'express';
import UserController from '../controllers/userController.js';
import passport from 'passport';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.register.bind(userController)); // Ruta de registro
router.post('/login', userController.login.bind(userController));
router.get('/current', passport.authenticate('jwt', { session: false }), userController.currentUser.bind(userController));

export default router;