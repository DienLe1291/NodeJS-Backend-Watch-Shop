import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth';
import BrandController from '../controllers/brand.controller';
import upload from '../utils/multer';

const router = express.Router();

router.route('/')
    .get(BrandController.getAllBrands)
    .post(verifyToken, verifyAdmin, upload.single('image'), BrandController.create)
    
router.route('/:id')
    .get(BrandController.getBrand)
    .put(verifyToken, verifyAdmin, upload.single('image'), BrandController.update)
    .delete(verifyToken, verifyAdmin, BrandController.delete)

export default router;
