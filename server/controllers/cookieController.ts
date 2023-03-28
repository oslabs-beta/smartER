import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import db from '../models/userModel';
import dotenv from 'dotenv';
dotenv.config();

interface cookieControllers {
  setJwtCookie: RequestHandler;
  setDbCookie: RequestHandler;
}

const cookieController: cookieControllers = {
  setJwtCookie: async (req, res, next) => {
    try {
      const createJwt = (email: string) => {
        const secret = process.env.JWT_SECRET_KEY;
        if (secret) {
          const token = jwt.sign(
            {
              email: email,
            },
            secret,
            {
              expiresIn: '7d',
            }
          );
          return token;
        }
      };

      const { email } = req.body;

      const jwtToken = createJwt(email);

      res.locals.JWT = jwtToken;
      res.cookie('JWT', jwtToken, {
        httpOnly: true,
        secure: true,
      });
      // res.header('Authorization', jwtToken);
      return next();
    } catch (error) {
      return next({
        log: 'error running cookieController.setJwtCookie middleware',
        status: 400,
        message: { err: error },
      });
    }
  },

  setDbCookie: async (req, res, next) => {
    try {
      if (res.locals.dbId) {
        // if uri was just saved, pull dbId from res.locals
        res.cookie('dbId', res.locals.dbId, {
          httpOnly: true,
          secure: true,
        });
        return next();
      } else if (res.locals.user_id) {
        // if user just signed up or logged in, get user id and use query to find most recent URI for that user
        // STRETCH: allow user to select from list of saved URIs instead of always pulling the last one
        const sql = await db.query(`
          SELECT _id FROM databases 
          WHERE user_id = ${res.locals.user_id}
          ORDER BY _id desc
          ;`);

        if (sql.rowCount) {
          const dbId = sql.rows[0]._id;
          res.cookie('dbId', dbId, {
            httpOnly: true,
            secure: true,
          });
        } else if (req.cookies.dbId) {
          res.cookie('dbId', 0, {
            httpOnly: true,
            secure: true,
          });
        }
        return next();
      } else throw new Error('user not set');
    } catch (error) {
      return next({
        log: 'error running cookieController.setDbCookie middleware',
        status: 400,
        message: { err: error },
      });
    }
  },
};

export default cookieController;
