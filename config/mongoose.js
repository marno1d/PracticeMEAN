const mongoose = require('mongoose');
const config = require('./config');
require('../app/models/users.server.model');

module.exports = () => {
  const db = mongoose.connect(config.db);
  return db;
};
