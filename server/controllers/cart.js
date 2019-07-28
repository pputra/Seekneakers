/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const cartAction = require('../actions/cart.action');
const { statusCode, successMessage } = require('../helpers/httpResponse');

module.exports = {
  getCart: async (req, res) => {
    const { userId } = req.decoded;

    try {
      const cart = await cartAction.getByUserId(userId);
      return res.status(statusCode.ok).json({
        cart,
        message: successMessage.FETCH_CART,
      });
    } catch (e) {
      return res.status(statusCode.forbidden).json({
        message: e.message,
      });
    }
  },
  addProduct: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;

    try {
      await cartAction.addProduct(userId, id);

      return res.status(statusCode.ok).json({
        message: successMessage.ADD_PRODUCT_TO_CART,
      });
    } catch (e) {
      return res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  modifyQuantity: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    const { newQuantity } = req.body;

    try {
      await cartAction.modifyQuantity(userId, id, newQuantity);
      return res.status(200).json({
        message: successMessage.ADD_PRODUCT_TO_CART,
      });
    } catch (e) {
      return res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  removeProduct: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    const { empty_cart: emptyCart } = req.query;

    try {
      if (emptyCart === 'true') {
        await cartAction.emptyCart(userId);
      } else {
        await cartAction.removeProduct(userId, id);
      }
      return res.status(statusCode.ok).json({
        message: successMessage.UPDATE_PRODUCT_QUANTITY_IN_CART,
      });
    } catch (e) {
      return res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
};
