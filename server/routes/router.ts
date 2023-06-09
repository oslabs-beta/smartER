import express from 'express';
import schemaController from '../controllers/schemaController';
import userController from '../controllers/userController';
import dbController from '../controllers/dbController';
import cookieController from '../controllers/cookieController';
const router = express.Router();

// Possibly add route for storing users previous login credentials or URIs?
router.post(
  '/getQueryResults',
  schemaController.connectDb,
  schemaController.getQueryResults,
  (req, res) => {
    res.status(200).json(res.locals.queryResults);
  }
);

router.post('/postHistory', dbController.postHistory, (req, res) => {
  res.status(200).json(res.locals.timestamp);
});

router.get(
  '/getSchema',
  schemaController.connectDb,
  schemaController.getSchemaPostgreSQL,
  (req, res) => {
    res.status(200).json(res.locals.erDiagram);
  }
);

router.get('/getHistory', dbController.getHistory, (req, res) => {
  res.status(200).json(res.locals.queryHistory);
});

router.post(
  '/addURI',
  dbController.saveURI,
  cookieController.setDbCookie,
  schemaController.connectDb,
  schemaController.getSchemaPostgreSQL,
  (req, res) => {
    res.status(200).json(res.locals.erDiagram);
  }
);

router.delete('/', (req, res, next) => {});

export default router;
