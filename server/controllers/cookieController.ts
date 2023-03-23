import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface cookieControllers {
  setJwtCookie: RequestHandler;
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
