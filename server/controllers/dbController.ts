import { RequestHandler } from 'express';
import db from '../models/userModel';
import dotenv from 'dotenv';
import {} from 'pg';
import Cryptr from 'cryptr';
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

        const cryptr = new Cryptr(process.env.URI_SECRET_KEY || 'test', {
          pbkdf2Iterations: 10000,
          saltLength: 10,
        });

        const encryptedUri = cryptr.encrypt(encodedURI);
        const postUri = await db.query(`
          INSERT INTO databases (user_id, uri)
          VALUES (${id}, '${encryptedUri}')
          RETURNING _id
          ;`);

        res.locals.dbId = postUri.rows[0]._id;
        return next();
      } else throw new Error('user not set');
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
      if (dbId) {
        const history = await db.query(`
          SELECT
          h.created_at, h.query
          FROM history h
          JOIN databases d on d._id = h.database_id
          WHERE d._id = ${dbId}
          ORDER BY created_at desc
          ;`);
        // console.log('history', history);
        res.locals.queryHistory = history.rows;
        return next();
      } else throw new Error('db not found');
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
      const { dbId } = req.cookies;
      if (req.cookies.dbId) {
        const { created_at, queryString } = req.body;
        const dateInt = Math.floor(parseInt(created_at) / 1000);
        const saveHistory = await db.query(
          `INSERT INTO history (database_id, created_at, query)
          VALUES (${dbId}, to_timestamp(${dateInt}), $1);`,
          [queryString]
        );
        return next();
      } else throw new Error('db not found');
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
