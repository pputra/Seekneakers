const mongoose = require('mongoose');

const connect = () => {
  let dbUrl = '';
  switch (process.env.STAGE) {
    case 'production':
      dbUrl = process.env.DB_URL_PRODUCTION;
      break;
    case 'testing':
      dbUrl = process.env.DB_URL_TESTING;
      break;
    default:
      dbUrl = process.env.DB_URL_DEVELOPMENT;
      break;
  }
  mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true });
};

module.exports = {
  connect,
};
