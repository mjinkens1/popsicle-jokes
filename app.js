const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const app = express();
const configDB = require('./config/database.js');
mongoose.connect(configDB.url, {
});
var db = mongoose.connection;
db.on('error', function (err) {
  console.error('There was a db connection error');
  return  console.error(err.message);
});
db.once('connected', function () {
  return console.log('Successfully connected to ' + configDB.url);
});
db.once('disconnected', function () {
  return console.error('Successfully disconnected from ' + configDB.url);
});

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/frontend/build')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.sendFile(path.join(__dirname + "/views/error.html"));
});

module.exports = app;
