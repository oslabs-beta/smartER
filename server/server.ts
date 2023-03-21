import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/router';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9001;

//General middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
