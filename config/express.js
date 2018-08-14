const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const config = require('./config');
const indexRoute = require('../app/routes/index.server.routes.js');

module.exports = () => {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret
    })
  );

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  indexRoute(app);

  app.use(express.static('./public'));

  return app;
};