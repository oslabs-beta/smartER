import { RequestHandler } from 'express';
import db from '../models/userModel';
import dotenv from 'dotenv';
dotenv.config();

interface dbControllers {
  saveURI: RequestHandler;
  getHistory: RequestHandler;
  postHistory: RequestHandler;
}

const dbController: dbControllers = {
  saveURI: async (req, res, next) => {
    try {
      if (req.user) {
        const { id } = req.user;
        const { encodedURI } = req.body;
        // TODO: if URI exists, replace it ?
        const uri = await db.query(`
          INSERT INTO databases (user_id, uri)
          VALUES (${id}, '${encodedURI}')
          RETURNING _id
          ;`);
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

  getHistory: async (req, res, next) => {
    try {
      const { dbId } = req.cookies;
      // const { email } = req.user;
      const email = 'mclmelissam@gmail.com';
      const history = await db.query(`SELECT 
        h.created_at, h.query 
        FROM history h
        JOIN users u on u._id = h.user_id
        WHERE u.email = '${email}';`);
      res.locals.queryHistory = history.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error in dbController.getHistory ${error}`,
        status: 400,
        message: { error },
      });
    }
  },

  postHistory: async (req, res, next) => {
    try {
      if (req.user) {
        const { created_at, queryString } = req.body;
        const { email } = req.user;

        const dateInt = Math.floor(parseInt(created_at) / 1000);
        console.log(dateInt);
        const saveHistory = await db.query(
          `INSERT INTO history (user_id, created_at, query)
          VALUES (
            (SELECT _id FROM users WHERE email = '${email}')
            , to_timestamp(${dateInt}), '${queryString}');`
        );

        // console.log(saveHistory);
        return next();
      }
      return next();
    } catch (error) {
      return next({
        log: `Error in dbController.postHistory ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
};

export default dbController;
