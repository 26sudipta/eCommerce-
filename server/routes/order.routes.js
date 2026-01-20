import express from 'express';
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrder,
  cancelOrder,
  updateOrderStatus
} from '../controllers/order.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// All order routes require authentication
router.use(verifyToken);

// User routes
router.post('/', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', cancelOrder);

// Admin routes
router.get('/', isAdmin, getAllOrders);
router.patch('/:id/status', isAdmin, updateOrderStatus);

export default router;
