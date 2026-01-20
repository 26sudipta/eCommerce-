import express from 'express';
const router = express.Router();

// Placeholder routes - will be implemented with DummyJSON integration
router.get('/', (req, res) => {
  res.json({ message: 'Get all products - to be implemented' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get product by ID - to be implemented' });
});

router.get('/category/:category', (req, res) => {
  res.json({ message: 'Get products by category - to be implemented' });
});

router.post('/seed', (req, res) => {
  res.json({ message: 'Seed products from DummyJSON - to be implemented' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create product (Admin) - to be implemented' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update product (Admin) - to be implemented' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete product (Admin) - to be implemented' });
});

export default router;
