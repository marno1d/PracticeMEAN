process.env.NODE_ENV = (typeof process.env.NODE_ENV !== "undefined") ? process.env.NODE_ENV : 'development';

const configureMongoose = require('./config/mongoose'); // must be first dependency so that db models are loaded
const configureExpress = require('./config/express');
const configurePassport = require('./config/passport');

// eslint-disable-next-line no-unused-vars
const db = configureMongoose();
const app = configureExpress();
const passport = configurePassport();
app.listen(3000);
module.exports = app;

// eslint-disable-next-line no-console
console.log('Server running at http://localhost:3000/');
