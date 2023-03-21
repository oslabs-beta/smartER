import { Request, Response, NextFunction, Handler } from 'express';
interface schemaControllers {
  getSchema: Handler;
}

const schemaController: schemaControllers = {
  getSchema: async (req, res, next) => {
    try {
      type test1 = keyof Handler;
      const { query } = req.body;
      // query DB
    } catch (error) {
      return next({
        log: `Error in schemaController.getSchema ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
};

export default schemaController;
