var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routing/index');
var booksRouter = require('./routing/books');

var app = express();
var port = 3034;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  // set locals, only providing error in development
  //res.locals.message = err.message;
 // res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  // render the error page
  res.json()
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

module.exports = app;