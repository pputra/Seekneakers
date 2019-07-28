/* eslint-disable no-underscore-dangle */
const Address = require('../models/Address');
const User = require('../models/User');

module.exports = {
  getById: (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;

    Address.findOne({ _id: id, user_id: userId }).then((address) => {
      const notAuthorized = !address;

      if (notAuthorized) {
        return res.status(401).json({ message: 'User is not authorized to access the address' });
      }
      return res.status(200).json({ message: 'address has been fetched', address });
    }).catch((err) => {
      res.status(400).json({ message: err.message });
    });
  },
  create: async (req, res) => {
    const { userId } = req.decoded;
    const {
      street,
      city,
      state,
      zip,
      country,
    } = req.body;

    try {
      const address = await new Address({
        user_id: userId,
        street,
        city,
        state,
        zip,
        country,
      }).save();
      await User.updateOne({ _id: userId }, { $push: { addresses: address._id } });
      res.status(201).json({ message: 'address has been added', address });
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
  updateById: (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    const {
      street,
      city,
      state,
      zip,
      country,
    } = req.body;

    Address.updateOne({ _id: id, user_id: userId }, {
      street,
      city,
      state,
      zip,
      country,
    }, { runValidators: true }).then((result) => {
      const notAuthorized = result.n === 0;

      if (notAuthorized) {
        return res.status(401).json({ message: 'User is not authorized to change the address' });
      }
      return res.status(200).json({ message: `address with id: ${id} has been updated`, result });
    }).catch((err) => {
      res.status(400).json({ message: err.message });
    });
  },
  deleteById: (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;

    Address.deleteOne({ _id: id, user_id: userId }).then((result) => {
      const notAuthorized = result.n === 0;

      if (notAuthorized) {
        return res.status(401).json({ message: 'User is not authorized to remove the address' });
      }
      return res.status(202).json({ message: `address with id: ${id} has been updated`, result });
    }).catch((err) => {
      res.status(400).json({ message: err.message });
    });
  },
};
