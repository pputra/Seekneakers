const shippingAction = require('../actions/shipping.action');
const cartAction = require('../actions/cart.action');
const { statusCode, errMessage } = require('../helpers/httpResponse');

const verifyShippingInfo = async (req, res, next) => {
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
      shippingIndex,
    } = req.body;

    const availableRates = await shippingAction
      .getRates(name, street, city, state, zip, country, phone, email);

    const chosenRate = availableRates[Number(shippingIndex)];

    req.chosenRate = chosenRate;

    return next();
  } catch (e) {
    return res.status(statusCode.badRequest).json({
      message: e.message,
    });
  }
};

const hasNonEmptyCart = async (req, res, next) => {
  try {
    const { userId } = req.decoded;

    const { products } = await cartAction.getByUserId(userId);

    const hasEmptyCart = products.length === 0;

    if (hasEmptyCart) {
      throw new Error(errMessage.USER_HAS_EMPTY_CART_TO_CHECKOUT);
    }

    req.productsToCheckout = products;

    return next();
  } catch (e) {
    return res.status(statusCode.badRequest).json({
      message: e.message,
    });
  }
};

module.exports = {
  verifyShippingInfo,
  hasNonEmptyCart,
};
