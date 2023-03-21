import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/router';
import userController from './controllers/userController';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9001;

//General middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  '/emailCheck',
  body('email').isEmail().normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    else return next();
  },
  userController.userExists
);

app.post(
  '/login',
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty(),

  userController.verifyUser,
  (req, res, next) => {}
);

app.post(
  '/signup',
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty(),

  userController.userExists,
  userController.createUser,
  (req, res, next) => {}
);

// API Route
app.use('/api', apiRouter);
// Catch all 404
app.use('/', (req: Request, res: Response) => {
  res.status(404).json(`This is not the page you are looking for ¯\\_(ツ)_/¯`);
});
// Encrypt 2way, read only access, credentials stored on VS Code local Storage

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  console.log(err.log);
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`⚡️Express:${PORT} ⚡️`);
});
