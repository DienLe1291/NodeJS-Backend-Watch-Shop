import express from 'express';
import AddressController from '../controllers/address.controller';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(verifyToken, AddressController.getAddressByUser)
    .post(verifyToken, AddressController.create)

router.route('/:id')
    .put(verifyToken, AddressController.update)
    .delete(verifyToken, AddressController.delete)

router.put('/default-address/:id', verifyToken, AddressController.updateDefaultAddress)

export default router;
