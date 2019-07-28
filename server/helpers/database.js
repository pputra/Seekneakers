const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    let dbUrl = '';
    if (process.env.STAGE === 'production') {
      dbUrl = process.env.DB_URL_PRODUCTION;
    } else if (process.env.STAGE === 'test') {
      dbUrl = process.env.DB_URL_TESTING;
    } else {
      dbUrl = process.env.DB_URL_DEVELOPMENT;
    }

    mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true });
  },
};
