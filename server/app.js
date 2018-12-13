require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const indexRouter = require('./routes/index');

let db_url = '';
if (process.env.STAGE === 'production') {
  db_url = process.env.DB_URL_PRODUCTION;
} else if (process.env.STAGE === 'testing') {
  db_url = process.env.DB_URL_TESTING;
} else {
  db_url = process.env.DB_URL_DEVELOPMENT;
}

mongoose.connect(db_url, {useNewUrlParser: true});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

module.exports = app;