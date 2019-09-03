/* global before after */
const supertest = require('supertest');
const { assert } = require('chai');
const app = require('../app');

const User = require('../db/models/User');
const Cart = require('../db/models/Cart');

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
