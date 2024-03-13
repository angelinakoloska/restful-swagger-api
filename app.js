require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var db = require("./models");
db.sequelize.sync({ force: false, alter: true })

const { auth } = require('express-openid-connect');
const config = {
authRequired: false,
auth0Logout: true
};

var app = express();
config.baseURL = `http://localhost:${process.env.PORT}`;
app.use(auth(config));
app.use(function (req, res, next) {
res.locals.user = req.oidc.user;
next();
});
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
app.use('/doc', swaggerUi.serve);
app.get('/doc', swaggerUi.setup(swaggerDocument));

//... view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err :
{};
// render the error page
res.status(err.status || 500);
res.render('error');
});

module.exports = app;