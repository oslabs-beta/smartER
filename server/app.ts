import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/router';
import userController from './controllers/userController';
import { body, validationResult } from 'express-validator';
import cookieController from './controllers/cookieController';

const app = express();

//General middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// post request to check if user input email is unique
app.post(
  '/user/emailCheck',
  body('email').isEmail().normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next({
        log: 'error: invalid email address',
        status: 400,
        message: { err: 'invalid email address' },
      });
    else return next();
  },
  userController.checkForEmail,
  (req, res, next) => {
    if (res.locals.userExists) {
      res.status(200).json('user exists');
    } else res.status(200).json('unique email');
  }
);

// post request to add new user to db
app.post(
  '/user/signup',
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors && !errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    else return next();
  },
  userController.checkForEmail,
  userController.createUser,
  cookieController.setJwtCookie,
  (req, res) => {
    return res.status(200).send();
  }
);

app.post(
  '/user/login',
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty(),
  userController.verifyUser,
  cookieController.setJwtCookie,
  cookieController.setDbCookie,
  (req, res) => {
    return res.status(200).send();
  }
);

app.post(
  '/user/changePassword',
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty(),
  body('newPassword').not().isEmpty(),
  userController.verifyUser,
  userController.changePassword,
  (req, res) => {
    return res.status(200).send();
  }
);

app.post(
  '/user/logout',
  userController.authenticateToken,
  userController.blacklistToken,
  (req, res) => {
    return res.status(200).send();
  }
);

app.get('/user/authenticate', userController.authenticateToken, (req, res) => {
  return res.status(200).send();
});

// API Route
app.use('/api', userController.authenticateToken, apiRouter);

// Catch all 4048
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
  console.log(err.message);
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

export default app;
