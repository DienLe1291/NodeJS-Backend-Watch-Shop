import express from 'express';
import UserController from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.put('/:id', verifyToken, UserController.update);

router.put('/change-password/:id', verifyToken, UserController.changePassword)

export default router;
