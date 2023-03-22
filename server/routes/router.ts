import express from 'express';
import schemaController from '../controllers/schemaController';
const router = express.Router();

router.get('/getQueryResults', schemaController.getQueryResults);
router.post('/getSchema', schemaController.getSchemaPostgreSQL);
router.patch('/', (req, res, next) => {});
router.delete('/', (req, res, next) => {});

export default router;
