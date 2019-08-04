/* eslint-disable no-underscore-dangle */
const Address = require('../models/Address');
const User = require('../models/User');
const { errMessage } = require('../helpers/httpResponse');

const create = (userId, street, city, state,
  zip, country) => new Promise(async (resolve, reject) => {
  try {
    const newAddress = await new Address({
      user_id: userId,
      street,
      city,
      state,
      zip,
      country,
    }).save();
    await User.updateOne({ _id: userId }, { $push: { addresses: newAddress._id } });
    return resolve(newAddress);
  } catch (e) {
    return reject(e);
  }
});

const getById = (userId, addressId) => new Promise(async (resolve, reject) => {
  try {
    const address = await Address.findOne({ _id: addressId, user_id: userId });
    const notAuthorized = !address;

    if (notAuthorized) {
      throw new Error(errMessage.FETCH_ADDRESS_UNAUTHORIZED);
    }

    return resolve(address);
  } catch (e) {
    return reject(e);
  }
});

const updateById = (userId, addressId, street, city,
  state, zip, country) => new Promise(async (resolve, reject) => {
  try {
    const result = await Address.updateOne({ _id: addressId, user_id: userId }, {
      street,
      city,
      state,
      zip,
      country,
    }, { runValidators: true });

    const notAuthorized = result.n === 0;

    if (notAuthorized) {
      throw new Error(errMessage.UPDATE_ADDRESS_UNAUTHORIZED);
    }

    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

const deleteById = (addressId, userId) => new Promise(async (resolve, reject) => {
  try {
    const result = await Address.deleteOne({ _id: addressId, user_id: userId });
    const notAuthorized = result.n === 0;

    if (notAuthorized) {
      throw new Error(errMessage.REMOVE_ADDRESS_UNAUTHORIZED);
    }

    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

module.exports = {
  create,
  getById,
  updateById,
  deleteById,
};
