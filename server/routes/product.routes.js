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

// Seed routes (specific routes BEFORE parameterized routes)
router.post('/seed', seedProducts);
router.get('/seed', seedProducts); // Allow GET for browser testing
router.delete('/clear/all', clearAllProducts);

// Public routes
router.get('/', getProducts);
router.get('/categories/all', getCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById); // This MUST come after specific routes

// Admin routes
router.post('/', verifyToken, isAdmin, createProduct);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;
