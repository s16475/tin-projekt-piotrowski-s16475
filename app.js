var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// zmienna sesji
const session = require('express-session');

// zmienne routerow
var indexRouter = require('./routes/index');
const employeeRouter = require('./routes/employeeRoute');
const claimRouter = require('./routes/claimRoute');
const policyRouter = require('./routes/policyRoute');

const empApiRouter = require('./routes/api/EmployeeApiRoute');
const claimApiRouter = require('./routes/api/ClaimApiRoute');
const policyApiRouter = require('./routes/api/PolicyApiRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// podlaczenie sesji
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

//funkcja udostepniajaca dane sesji szablonom
app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
      res.locals.loginError = undefined;
  }
  next();
});

// podlaczenie routerow
app.use('/policies', policyRouter);
app.use('/claims', claimRouter);
app.use('/employees', employeeRouter);
app.use('/', indexRouter);

app.use('/api/employees', empApiRouter);
app.use('/api/claims', claimApiRouter);
app.use('/api/policies', policyApiRouter);


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
  res.render('error');
});

module.exports = app;
