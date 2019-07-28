/* global before after */
const supertest = require('supertest');
const { assert } = require('chai');
const app = require('../app');

const User = require('../models/User');
const Cart = require('../models/Cart');

const server = supertest(app);

before((done) => {
  done();
});

require('./user.test')(server, assert);

after((done) => {
  Promise.all([
    User.deleteMany({}),
    Cart.deleteMany({}),
  ]).then(() => {
    done();
  });
});
