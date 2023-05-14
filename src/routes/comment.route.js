import express from 'express';
import CommentController from '../controllers/comment.controller';
import upload from '../utils/multer';
import {verifyToken} from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(CommentController.getAllComments)
    .post(verifyToken, CommentController.create)

router.route('/:id')
    .get(verifyToken, CommentController.getComment)
    .put(verifyToken, CommentController.update)
    .delete(verifyToken, CommentController.delete)

export default router;
