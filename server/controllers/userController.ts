import db from '../models/userModel';
import { Request, Response, NextFunction, Handler } from 'express';

interface userControllers {
  createUser: Handler;
  verifyUser: Handler;
}

const userController: userControllers = {
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

  verifyUser: async (req, res, next) => {},
};

export default userController;
