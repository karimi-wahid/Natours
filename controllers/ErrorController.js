import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

const handleDuplicateError = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
}

const handleValidationErrorDB = (err) => {
  const errors = Object.keys(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);

const sendErrorProd = (err, res) => {
  if(err.isOperational){

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
  }else {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};


const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';


  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if(error.name === 'CastError') error = handleCastErrorDB(error);
    if(error.code === 11000) error = handleDuplicateError(error)
      if(error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if(error.name === 'JsonWebTokenError') error = handleJWTError();
    if(error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
