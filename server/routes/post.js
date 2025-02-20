import express from 'express'
import { createPost, deletePost, dislikePost, getAllPosts, getPostById, likePost, updatePost } from '../controller/post.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router()


router.get('/', verifyToken, getAllPosts);
router.post('/', verifyToken, createPost)
router.get('/:id', getPostById)
router.put('/:id',verifyToken, updatePost)
router.put('/:id/like', verifyToken, likePost);
router.put('/:id/dislike', verifyToken, dislikePost);
router.delete('/:id', verifyToken, deletePost)

export default router;