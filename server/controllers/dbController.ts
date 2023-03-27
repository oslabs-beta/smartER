import { RequestHandler } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface dbControllers {
  saveURI: RequestHandler;
  updateURI: RequestHandler;
  getHistory: RequestHandler;
}

const dbController: dbControllers = {
  saveURI: async (req, res, next) => {
    try {
      if (req.user) {
        const { email } = req.user;
        const { encodedURI } = req.body;
        // TODO: if URI exists, replace it ?
        const sql = `INSERT INTO `;
      }
      return next();
    } catch (error) {
      return next({
        log: `Error in dbController.saveURI ${error}`,
        status: 400,
        message: { error },
      });
    }
  },

  updateURI: async (req, res, next) => {
    try {
      if (req.user) {
        const { email } = req.user;
        const { uri } = req.body;
        const sql = `UPDATE `;
      }
      return next();
    } catch (error) {
      return next({
        log: `Error in dbController.updateURI ${error}`,
        status: 400,
        message: { error },
      });
    }
  },

  getHistory: async (req, res, next) => {
    try {
      if (req.user) {
        const { email } = req.user;
        res.locals.queryHistory = 'QUERY HISTORY FROM DB';
      }
      return next();
    } catch (error) {
      return next({
        log: `Error in dbController.getHistory ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
};

export default dbController;
