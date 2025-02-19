import express from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/current', authenticateJWT, userController.getCurrentUser);

export default router;