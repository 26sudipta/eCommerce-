import express from 'express';
import {
  seedProducts,
  getProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  clearAllProducts
} from '../controllers/product.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/categories/all', getCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// Seed route (make admin-only in production)
router.post('/seed', seedProducts);
router.delete('/clear/all', clearAllProducts);

// Admin routes
router.post('/', verifyToken, isAdmin, createProduct);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;
