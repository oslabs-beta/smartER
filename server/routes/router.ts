import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  return res.json('Hello from router');
});
router.post('/', (req, res, next) => {});
router.patch('/', (req, res, next) => {});
router.delete('/', (req, res, next) => {});

export default router;
