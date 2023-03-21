import express, { Request, Response, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/router';

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

// Global error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  console.log(err.log);
  const errorObj = Object.assign({}, defaultErr, err);
  // console.log(errorObj.message.error);
  return res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚡️Express:${PORT} ⚡️`);
});
