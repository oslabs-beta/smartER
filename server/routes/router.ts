import express from 'express';
import schemaController from '../controllers/schemaController';
const router = express.Router();

router.get('/', (req, res, next) => {
  return res.json('Hello from router');
});
router.post('/getSchema', schemaController.getSchema);
router.patch('/', (req, res, next) => {});
router.delete('/', (req, res, next) => {});
export default router;
// {
//   log: `Error in router.post ${error}`,
//   status: 400,
//   message: { error },
// }
