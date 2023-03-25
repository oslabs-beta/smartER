import express from 'express';
import schemaController from '../controllers/schemaController';
const router = express.Router();

// Possibly add route for storing users previous login credentials or URLs?
router.get(
  '/getQueryResults',
  schemaController.connectDb,
  schemaController.getQueryResults,
  (req, res) => {
    res.json(res.locals.queryResults);
  }
);
router.get(
  '/getSchema',
  schemaController.connectDb,
  schemaController.getSchemaPostgreSQL,
  (req, res) => {
    res.status(200).json(res.locals.erDiagram);
  }
);

router.get(
  '/getSchemaPerformance',
  schemaController.connectDb,
  schemaController.getQueryPerformance
);

router.patch('/changeURI', (req, res, next) => {});
router.delete('/', (req, res, next) => {});

export default router;
