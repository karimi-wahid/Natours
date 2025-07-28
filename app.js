import express from 'express';
export const app = express();
app.use(express.json());

import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// for unhandled routes
app.all('*', (req, res, next) => {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: `Can't find ${req.originalUrl} on this server.`,
  //   });

  const err = new Error(`Can't find ${req.originalUrl} on this server.`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
