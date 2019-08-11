/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const orderAction = require('../actions/order.action');
const orderQueue = require('../lib/rabbitMQ/publishers/order.publish');

const { hasEmptyField } = require('../helpers/validator');
const { statusCode, successMessage, errMessage } = require('../helpers/httpResponse');

module.exports = {
  getAll: async (req, res) => {
    const { userId } = req.decoded;

    try {
      const orders = await orderAction.getAll(userId);

      res.status(statusCode.ok).json({
        message: successMessage.FETCH_ORDER_HISTORY,
        orders,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const { chosenRate, productsToCheckout } = req;
      const {
        name,
        street,
        city,
        state,
        zip,
        country,
      } = req.body;

      const fields = {
        name,
        street,
        city,
        state,
        zip,
        country,
      };

      if (hasEmptyField(fields)) {
        throw new Error(errMessage.USER_HAS_EMPTY_INFO);
      }

      orderQueue
        .publish(userId, name, street, city, state, zip, country, productsToCheckout, chosenRate);

      res.status(statusCode.created).json({
        message: successMessage.PLACE_ORDER,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
};
