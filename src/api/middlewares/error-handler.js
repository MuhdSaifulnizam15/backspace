const mongoose = require('mongoose');
const httpStatus = require('http-status');
const config = require('../../config/config');
const logger = require('../../config/logger');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode =
        error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (config.env === 'production' && !err.isOperational) {
      status = false,
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus['500'];
    }
  
    res.locals.errorMessage = err.message;
  
    const response = {
      status: false,
      code: statusCode,
      message,
      ...(config.env === 'development' || config.env === 'local'  && { stack: err.stack }),
    };
  
    if (config.env === 'development' || config.env === 'local' ) {
      logger.error(err);
    }
  
    res.status(statusCode).send(response);
  };
  
  module.exports = {
    errorConverter,
    errorHandler,
  };