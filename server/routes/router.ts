import express from 'express';
import schemaController from '../controllers/schemaController';
import userController from '../controllers/userController';
import uriController from '../controllers/uriController';
const router = express.Router();

// Possibly add route for storing users previous login credentials or URLs?
router.get(
  '/getQueryResults',
  schemaController.connectDb,
  schemaController.getQueryResults
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

router.post('/addURI', userController.authenticateToken, uriController.saveURI);

router.patch('/changeURI', (req, res, next) => {});
router.delete('/', (req, res, next) => {});

export default router;
