/* global describe it */
const { login, create, findUserInfoById } = require('../actions/user.action');
const { errMessage } = require('../helpers/httpResponse');

module.exports = (server, assert) => {
  describe('users action', () => {
    let validUserId;
    const validData = {
      firstName: 'mr',
      lastName: 'tester',
      email: 'testvalid@mail.com',
      password: 'Password1*',
      passwordRepeat: 'Password1*',
    };

    it('should create a new user successfully', (done) => {
      const {
        firstName,
        lastName,
        email,
        password,
        passwordRepeat,
      } = validData;

      const validKeys = [
        'addresses',
        'oauth',
        'role',
        'orders',
        '_id',
        'first_name',
        'last_name',
        'email',
        'password',
      ];

      create(firstName, lastName, email, password, passwordRepeat)
        .then((result) => {
          // eslint-disable-next-line no-underscore-dangle
          assert.containsAllKeys(result._doc, validKeys);
          assert.equal(result.email, email);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
    it('should not create a new user if email is already taken', (done) => {
      const {
        firstName,
        lastName,
        email,
        password,
        passwordRepeat,
      } = validData;

      create(firstName, lastName, email, password, passwordRepeat)
        .then(() => {
          done(new Error('user should not be created'));
        })
        .catch((e) => {
          assert.equal(e.message, 'email is already used by another user');
          done();
        });
    });

    it('should login the user successfully', (done) => {
      const {
        email,
        password,
      } = validData;

      const validKeys = ['token', 'user_id'];

      login(email, password)
        .then((result) => {
          assert.containsAllKeys(result, validKeys);
          validUserId = result.user_id;
          done();
        })
        .catch((e) => {
          done(e);
        });
    });

    it('should not login the user if the login info is invalid', (done) => {
      const email = 'testInvalid@mail.com';
      const password = 'Password1*';

      login(email, password)
        .then(() => {
          done(new Error('user should not be logged in'));
        })
        .catch((e) => {
          assert.equal(e.message, errMessage.INVALID_LOGIN_INFO);
          done();
        });
    });

    it('should fetch the user info successfully', (done) => {
      const validKeys = [
        '_id',
        'first_name',
        'last_name',
      ];

      findUserInfoById(validUserId)
        .then((result) => {
          // eslint-disable-next-line no-underscore-dangle
          assert.containsAllKeys(result._doc, validKeys);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });

    it('should not fetch the user info if user id is invalid', (done) => {
      findUserInfoById('123')
        .then(() => {
          // eslint-disable-next-line no-underscore-dangle
          done(new Error('it should fail to fetch user info'));
        })
        .catch(() => {
          done();
        });
    });
  });
};
