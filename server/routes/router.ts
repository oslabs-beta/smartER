import express from 'express';
import schemaController from '../controllers/schemaController';
const router = express.Router();

// Possibly add route for storing users previous login credentials or URLs?
router.get('/getQueryResults', schemaController.getQueryResults);
router.get('/getSchema', schemaController.getSchemaPostgreSQL);
router.patch('/changeURI', (req, res, next) => {});
router.delete('/', (req, res, next) => {});

export default router;
