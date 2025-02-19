import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();
const userController = new UserController();

router.post('/login', userController.login.bind(userController));
router.get('/current', authenticateJWT, userController.currentUser.bind(userController));

export default router;