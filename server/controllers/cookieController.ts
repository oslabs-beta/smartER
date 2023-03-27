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
      if (req.user) {
        const { id } = req.user;
        const sql = await db.query(`
          SELECT _id FROM databases 
          WHERE user_id = ${id}
          ;`);

        const dbId = sql.rows[0]._id;

        res.cookie('dbId', dbId, {
          httpOnly: true,
          secure: true,
        });
      }
      return next();
      // TODO: move return next inside if statement and return error if no user obj
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
