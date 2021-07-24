const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const httpStatus = require('http-status');
const passport = require('passport');
const favicon = require('serve-favicon');
const path = require('path');

const config = require('./config/config');
const morgan = require('./config/morgan');
const routes = require('./api/routes/v1');
const logger = require('./config/logger');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./api/middlewares/limiter');
const { errorConverter, errorHandler } = require('./api/middlewares/error-handler');
const ApiError = require('./api/utils/ApiError');

const app = express();

mongoose.connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch(err => {
        logger.error(err);
    });

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// Serve Favicon
app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
    app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;