import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';

//file imports
require('./config/mongoose');
import routes from './config/routes';
require('./api/policies/Auth');
// var oauth2 = require('./api/policies/oauth2');
const log = require('./config/log')(module);


const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: false,parameterLimit: 1000000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(passport.initialize());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  next();
});
app.use('/', routes);
// app.use('/api/oauth/token', oauth2.token);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
  log.debug('Not found URL: %s',req.url);
  res.json({ error: 'Not found' });
  return;
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the log error
  res.status(err.status || 500);
  log.error('Internal error(%d): %s',res.statusCode,err.message);
  res.json({ error: err.message });
  return;
});

export default app;