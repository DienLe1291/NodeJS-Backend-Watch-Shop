import express from 'express';
import CartController from '../controllers/cart.controller';
import {verifyToken, verifyAdmin} from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(verifyToken, verifyAdmin, CartController.getAllCarts)
    .post(verifyToken, CartController.create)

router.get('/user', verifyToken, CartController.getCartByUser)

router.route('/:id')
    .get(verifyToken, CartController.getCart)
    .put(verifyToken, CartController.update)
    .delete(verifyToken, CartController.delete)

export default router;
