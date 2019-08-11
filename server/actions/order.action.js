/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const Order = require('../models/Order');
const User = require('../models/User');

const productAction = require('./product.action');
const cartAction = require('./cart.action');
const { errMessage } = require('../helpers/httpResponse');

const getAll = userId => new Promise(async (resolve, reject) => {
  try {
    const userData = await User.findOne({ _id: userId }).populate({
      path: 'orders',
      model: 'Order',
      populate: [{
        path: 'products',
      },
      {
        path: 'products.product_id',
        model: 'Product',
      }],
    });

    const orders = userData.orders.reverse();
    return resolve(orders);
  } catch (e) {
    return reject(e);
  }
});

const create = (userId, name, street, city, state,
  zip, country, productsToCheckout, chosenRate) => new Promise(async (resolve, reject) => {
  try {
    const {
      totalPrice,
      productsInStock: orderedProducts,
    } = await productAction.getProductsInStock(productsToCheckout);

    const productsOutOfStock = orderedProducts.length === 0;

    if (productsOutOfStock) {
      throw new Error(errMessage.PRODUCT_OUT_OF_STOCK);
    }

    const addedOrder = await Order.create({
      customer: {
        user_id: userId,
        name,
      },
      address: {
        street,
        city,
        state,
        zip,
        country,
      },
      products: orderedProducts,
      courier: {
        provider: chosenRate.provider,
        service_name: chosenRate.name,
        price: chosenRate.price,
      },
      total_price: totalPrice + Number(chosenRate.price),
    });

    await User.updateOne({ _id: userId }, {
      $push: {
        orders: addedOrder._id,
      },
    });

    await cartAction.emptyCart(userId);
    return resolve(addedOrder);
  } catch (e) {
    return reject(e);
  }
});

module.exports = {
  getAll,
  create,
};
