const { statusCode, successMessage } = require('../helpers/httpResponse');
const shippingAction = require('../actions/shipping.action');

module.exports = {
  getOptions: async (req, res) => {
    try {
      const {
        name,
        street,
        city,
        state,
        zip,
        country,
        phone,
        email,
      } = req.body;

      const availableRates = await shippingAction.getRates(name, street, city, state,
        zip, country, phone, email);

      res.status(statusCode.ok).json({
        message: successMessage.FETCH_SHIPPING_RATES,
        availableRates,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
};
