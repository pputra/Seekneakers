require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const { connect } = require('./helpers/database');
const indexRouter = require('./routes/index');

connect();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;