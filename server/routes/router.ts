import express from 'express';
import schemaController from '../controllers/schemaController';
import userController from '../controllers/userController';
import dbController from '../controllers/dbController';
const router = express.Router();

// Possibly add route for storing users previous login credentials or URLs?
router.post(
  '/getQueryResults',
  schemaController.connectDb,
  schemaController.getQueryResults,
  (req, res) => {
    res.status(200).json(res.locals.queryResults);
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

router.get('/getHistory', dbController.getHistory, (req, res) => {
  res.status(200).json(res.locals.queryHistory);
});

router.post('/addURI', dbController.saveURI, (req, res) => {
  res.status(200).send();
});

// router.patch(
//   '/changeURI',
//   userController.authenticateToken,
//   dbController.updateURI,
//   (req, res) => {
//     res.status(200).send();
//   }
// );
router.delete('/', (req, res, next) => {});

export default router;
