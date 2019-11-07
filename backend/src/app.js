const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const v1Router = require('./routes/v1.route');

const { TokenMiddleware } = require('./middlewares/token.middleware');

const app = express();

const indexRouter = require('./routes/index.route');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(TokenMiddleware);
app.use('/api/v1/', v1Router);

module.exports = app;
