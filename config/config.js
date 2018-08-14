module.exports =
  process.env.NODE_ENV === 'production'
    ? require('./env/production.js')
    : require('./env/development.js');
