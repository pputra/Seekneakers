const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    let db_url = '';
    if (process.env.STAGE === 'production') {
      db_url = process.env.DB_URL_PRODUCTION;
    } else if (process.env.STAGE === 'testing') {
      db_url = process.env.DB_URL_TESTING;
    } else {
      db_url = process.env.DB_URL_DEVELOPMENT;
    }

    mongoose.connect(db_url, {useNewUrlParser: true});
  },
};