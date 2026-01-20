import express from 'express';
const router = express.Router();

// Placeholder routes
router.post('/', (req, res) => {
  res.json({ message: 'Submit contact form - to be implemented' });
});

router.get('/', (req, res) => {
  res.json({ message: 'Get all contact messages (Admin) - to be implemented' });
});

export default router;
