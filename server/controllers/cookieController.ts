import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface cookieController {
  setJwtCookie: RequestHandler;
}

const cookieController = {
  setJwtCookie: async (req, res, next) => {
    try {
      const createJwt = (email: string) => {
        const secret = process.env.JWT_SECRET_KEY;
        if (secret) {
          const token = Jwt.sign(
            {
              email: email,
            },
            secret
          );
          return token;
        }
      };

      const { email } = req.body;

      const jwtToken = createJwt(email);

      res.locals.JWT = jwtToken;
      res.cookit('JWT', jwtToken, {
        httpOnly: true,
      });
      return next();
    } catch (error) {
      return next({
        log: 'error running cookieController.setJwtCookie middleware',
        status: 400,
        message: { err: error },
      });
    }
  },
};

export default cookieController;
