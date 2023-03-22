import db from '../models/userModel';
import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { createClient, RedisClientType } from 'redis';
import { User } from '../../types/custom';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const SALTROUNDS = 5;
import dotenv from 'dotenv';
dotenv.config();

interface userControllers {
  checkForEmail: RequestHandler;
  createUser: RequestHandler;
  verifyUser: RequestHandler;
  authenticateToken: RequestHandler;
  blacklistToken: RequestHandler;
}

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

// connect redis for use in logout functionality
let redisClient: RedisClientType;
async () => {
  redisClient = createClient();

  redisClient.on('error', (error) => {
    console.log(error);
  });

  redisClient.on('connect', () => {
    console.log('Redis connected');
  });
};

const userController: userControllers = {
  // confirm whether user exists based on email passed in
  checkForEmail: async (req, res, next) => {
    try {
      const emailLookup = await db.query(
        `SELECT _id FROM users WHERE email = '${req.body.email}'`
      );
      res.locals.userExists = Boolean(emailLookup.rowCount);
      return next();
    } catch (error) {
      return next({
        log: 'error running userController.userExists middleware',
        status: 400,
        message: { err: error },
      });
    }
  },

  // create user based on email and password passed in
  createUser: async (req, res, next) => {
    try {
      if (res.locals.userExists) {
        return next({
          log: 'error: email already exists',
          status: 409,
          message: { err: 'account with this email already exists' },
        });
      }

      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
      await db.query(
        `INSERT into users (email, password)
        VALUES ('${email}', '${hashedPassword}')`
      );
      return next();
    } catch (error) {
      return next({
        log: 'error running userController.createUser middleware',
        status: 400,
        message: { err: error },
      });
    }
  },

  // verify user by email/password combination
  verifyUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const pwLookup = await db.query(
        `SELECT password FROM users WHERE email = '${email}'`
      );

      const hashedPassword = pwLookup.rows[0].password;
      const isValidPw = await comparePassword(password, hashedPassword);
      if (!isValidPw) {
        return next({
          log: 'error: incorrect password',
          status: 401,
          message: { err: 'email or password is incorrect' },
        });
      } else return next();
    } catch (error) {
      return next({
        log: 'error running userController.verifyUser middleware',
        status: 400,
        message: { err: error },
      });
    }
  },

  // protect API routes by validating JWT
  authenticateToken: async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      // reject request if no token provided
      if (token === null) {
        return next({
          log: 'no token provided',
          status: 401,
          message: { err: 'no token provided' },
        });
      }

      // reject request if token is in deny list (user logged out)
      const inDenyList = await redisClient.get(`bl_${token}`);
      if (inDenyList) {
        return next({
          log: 'JWT rejected',
          status: 401,
          message: { err: 'JWT rejected' },
        });
      }

      // reject request if token is invalid
      const secret = process.env.JWT_SECRET_KEY;
      if (token && secret) {
        jwt.verify(token, secret, (error, user) => {
          if (error) {
            return next({
              log: 'JWT invalid',
              status: 401,
              message: { err: error },
            });
          }

          const decodedToken = user as { email: string; exp: number };
          const { email, exp } = decodedToken;

          req.user = {
            email: email,
            token: token,
            exp: exp,
          };
          return next();
        });
      }
    } catch (error) {
      return next({
        log: 'error running userController.protect middleware',
        status: 400,
        message: { err: error },
      });
    }
  },

  blacklistToken: async (req, res, next) => {
    const { email, token, tokenExp } = req.cookies.JWT;
  },
};

export default userController;
