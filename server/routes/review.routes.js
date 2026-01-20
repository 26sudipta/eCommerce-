import express from 'express';
import {
  getAllReviews,
  getProductReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/review.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllReviews);
router.get('/product/:productId', getProductReviews);

// Protected routes
router.post('/', verifyToken, createReview);
router.put('/:id', verifyToken, updateReview);
router.delete('/:id', verifyToken, deleteReview);

export default router;
