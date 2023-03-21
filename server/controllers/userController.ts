import db from '../models/userModel';
import { Request, Response, NextFunction, Handler } from 'express';

interface userControllers {
  validEmail: Handler;
  validPassword: Handler;
  userExists: Handler;
  createUser: Handler;
  verifyUser: Handler;
}

const userController: userControllers = {
  // confirm email address is valid and normalize
  validEmail: async (req, res, next) => {},

  // confirm request has a password
  validPassword: async (req, res, next) => {},

  // confirm whether user exists based on email passed in
  userExists: async (req, res, next) => {},

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
