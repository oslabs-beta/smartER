import { RequestHandler } from 'express';
import db from '../models/userModel';
import dotenv from 'dotenv';
import { redirect } from 'react-router';
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
        const postUri = await db.query(`
          INSERT INTO databases (user_id, uri)
          VALUES (${id}, '${encodedURI}')
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
          ;`);
        console.log('history', history);
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
      if (dbId) {
        const { created_at, queryString } = req.body;
        const dateInt = Math.floor(parseInt(created_at) / 1000);
        const saveHistory = await db.query(
          `INSERT INTO history (database_id, created_at, query)
          VALUES (${dbId}, to_timestamp(${dateInt}), '${queryString}');`
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
