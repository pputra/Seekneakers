/* eslint-disable no-underscore-dangle */
const addressAction = require('../actions/adress.action');
const { statusCode, successMessage } = require('../helpers/httpResponse');

module.exports = {
  getById: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const { id } = req.params;
      const address = await addressAction.getById(userId, id);

      res.status(statusCode.ok).json({
        message: successMessage.FETCH_ADDRESS,
        address,
      });
    } catch (e) {
      res.status(statusCode.unauthorized).json({
        message: e.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const {
        street,
        city,
        state,
        zip,
        country,
      } = req.body;
      const address = await addressAction.create(userId, street, city, state, zip, country);

      res.status(statusCode.created).json({
        message: successMessage.CREATE_ADDRESS,
        address,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  updateById: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const { id: addressId } = req.params;
      const {
        street,
        city,
        state,
        zip,
        country,
      } = req.body;
      const result = await addressAction.updateById(userId, addressId,
        street, city, state, zip, country);

      res.status(statusCode.ok).json({
        message: successMessage.UPDATE_ADDRESS_BY_ID(addressId),
        data: result,
      });
    } catch (e) {
      res.status(statusCode.unauthorized).json({
        message: e.message,
      });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const { id: addressId } = req.params;
      const result = await addressAction.deleteById(addressId, userId);

      res.status(statusCode.ok).json({
        message: successMessage.REMOVE_ADDRESS_BY_ID(addressId),
        data: result,
      });
    } catch (e) {
      res.status(statusCode.unauthorized).json({
        message: e.message,
      });
    }
  },
};
