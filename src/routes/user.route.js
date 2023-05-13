import express from 'express';
import UserController from '../controllers/user.controller';
import { verifyToken, verifyAdmin } from '../middleware/auth';
import upload from '../utils/multer';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, UserController.getAllUsers);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.route('/:id')
    .get(verifyToken, UserController.getUser)
    .put(verifyToken, upload.single('image'), UserController.update)
    .delete(verifyToken, verifyAdmin, UserController.delete);

router.put('/change-password/:id', verifyToken, UserController.changePassword)

export default router;
