/* eslint-disable no-underscore-dangle */
const User = require('../db/models/User');
const Cart = require('../db/models/Cart');
const { errMessage } = require('../helpers/httpResponse');
const { createUserErr } = require('../helpers/errCatcher');
const { encrypt } = require('../helpers/encryption');
const { generateToken } = require('../helpers/jsonwebtoken');

const create = (firstName, lastName, email,
  password, passwordRepeat) => new Promise(async (resolve, reject) => {
  if (password !== passwordRepeat) {
    return reject(new Error(errMessage.PASSWORD_DONT_MATCH));
  }

  let newUser = '';
  const params = {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  };

  try {
    newUser = await new User(params).save();
  } catch (e) {
    return reject(new Error(createUserErr(e)));
  }

  try {
    await new Cart({ user_id: newUser._id, total_price: 0 }).save();
    return resolve(newUser);
  } catch (e) {
    await User.deleteOne({ _id: newUser._id });
    return reject(new Error(errMessage.CREATE_CART_FAILED));
  }
});

const login = (email, password) => new Promise(async (resolve, reject) => {
  try {
    const params = {
      email,
      password: encrypt(password),
    };

    const user = await User.findOne(params);

    if (user) {
      return resolve({
        token: generateToken(user._id, email),
        user_id: user._id,
      });
    }

    throw new Error(errMessage.INVALID_LOGIN_INFO);
  } catch (e) {
    return reject(e);
  }
});

const findUserInfoById = userId => new Promise(async (resolve, reject) => {
  try {
    const params = {
      _id: userId,
    };

    const options = 'first_name last_name';

    const user = await User.findOne(params, options);
    return resolve(user);
  } catch (e) {
    return reject(e);
  }
});

module.exports = {
  create,
  login,
  findUserInfoById,
};
