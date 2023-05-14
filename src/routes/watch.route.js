import express from 'express';
import WatchController from '../controllers/watch.controller';
import { verifyToken, verifyAdmin } from '../middleware/auth';
import upload from '../utils/multer';

const router = express.Router();

router.route('/')
    .get(WatchController.getAllWatches)
    .post(verifyToken, verifyAdmin, upload.single('image'), WatchController.create)

router.route('/:id')
    .get(WatchController.getWatch)
    .put(verifyToken, verifyAdmin, upload.single('image'), WatchController.update)
    .delete(verifyToken, verifyAdmin, WatchController.delete)

router.route('/brand/:id')
    .get(WatchController.getWatchByBrand)

export default router;
