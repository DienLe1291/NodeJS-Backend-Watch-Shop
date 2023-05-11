import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth';
import BrandController from '../controllers/brand.controller';
import upload from '../utils/multer';

const router = express.Router();

router.route('/')
    .post(verifyToken, verifyAdmin, upload.single('image'), BrandController.create)
    
router.route('/:id')
    .put(verifyToken, verifyAdmin, upload.single('image'), BrandController.update)

export default router;
