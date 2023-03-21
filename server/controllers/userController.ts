import db from '../models/userModel';
import { Request, Response, NextFunction, Handler } from 'express';
import { body, validationResult } from 'express-validator';

interface userControllers {
  userExists: Handler;
  createUser: Handler;
  verifyUser: Handler;
}

const userController: userControllers = {
  // confirm whether user exists based on email passed in
  userExists: async (req, res, next) => {
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
    // res.json(req.body);
  },

  // create user based on email and password passed in
  createUser: async (req, res, next) => {
    try {
      const test = await db.query(`SELECT * FROM users`);
      res.json(test);
    } catch (error) {
      return next({
        log: 'error running userController.createUser middleware',
        status: 400,
        message: { err: error },
      });
    }
  },

  // verify user by email/password combination
  verifyUser: async (req, res, next) => {},
};

export default userController;
