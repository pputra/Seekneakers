/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { errMessage } = require('../helpers/httpResponse');

const updateProductPriceInCart = cart => new Promise(async (resolve, reject) => {
  try {
    const { products } = cart;
    let updatedTotalPrice = 0;

    products.forEach((product) => {
      const { product_id: { price }, quantity } = product;
      // eslint-disable-next-line no-param-reassign
      product.price = price;
      updatedTotalPrice += price * quantity;
    });

    // eslint-disable-next-line no-param-reassign
    cart.total_price = updatedTotalPrice;

    await cart.save();
    return resolve();
  } catch (e) {
    return reject(e);
  }
});

const getByUserId = userId => new Promise(async (resolve, reject) => {
  try {
    const cart = await Cart.findOne({ user_id: userId }).populate('products.product_id');

    if (!cart) {
      throw new Error(errMessage.INVALID_TOKEN);
    }

    await updateProductPriceInCart(cart);

    return resolve(cart);
  } catch (e) {
    return reject(e);
  }
});

const addProduct = (userId, productId) => new Promise(async (resolve, reject) => {
  try {
    const cart = await getByUserId(userId);

    const { products } = cart;

    const productIndex = products.findIndex(product => (product.product_id._id == productId));

    const productNotInCart = productIndex === -1;

    if (productNotInCart) {
      const productToAdd = await Product.findOne({ _id: productId });
      const newProductPrice = productToAdd.price;
      const newProductStock = productToAdd.stock;

      if (newProductStock <= 0) {
        throw new Error(errMessage.PRODUCT_OUT_OF_STOCK);
      }

      cart.products.push({ product_id: productId, quantity: 1, price: newProductPrice });
      cart.total_price += newProductPrice;
    } else {
      const exceedsStockCapacity = products[productIndex].product_id.stock
        <= products[productIndex].quantity;

      if (exceedsStockCapacity) {
        throw new Error(errMessage.EXCEED_STOCK_CAPACITY);
      }

      products[productIndex].quantity += 1;

      cart.total_price += products[productIndex].price;
    }

    await cart.save();

    return resolve(cart);
  } catch (e) {
    return reject(e);
  }
});

const modifyQuantity = (userId, productId, newQuantity) => new Promise(async (resolve, reject) => {
  try {
    const cart = await getByUserId(userId);

    const productIndex = cart.products.findIndex(product => (product.product_id._id == productId));
    const prevQuantity = cart.products[productIndex].quantity;
    const { price, stock } = cart.products[productIndex].product_id;

    const invalidQuantity = newQuantity <= 0 || newQuantity > stock;

    if (invalidQuantity) {
      throw new Error('invalid product quantity');
    }

    const result = await Cart.updateOne({
      user_id: userId,
      'products.product_id': productId,
    }, {
      $set: {
        'products.$.quantity': newQuantity,
      },
      total_price: cart.total_price - (price * prevQuantity) + (price * newQuantity),
    });

    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

const emptyCart = userId => new Promise(async (resolve, reject) => {
  try {
    const cart = await getByUserId(userId);
    cart.products = [];

    await cart.save();

    return resolve(cart);
  } catch (e) {
    return reject(e);
  }
});

const removeProduct = (userId, productId) => new Promise(async (resolve, reject) => {
  try {
    const cart = await getByUserId(userId);
    const { products } = cart;

    const productIndex = products.findIndex(product => (product.product_id._id == productId));

    const productNotInCart = productIndex === -1;
    if (productNotInCart) {
      throw new Error(errMessage.PRODUCT_TO_REMOVE_NOT_IN_CART);
    }

    const prevPrice = cart.products[productIndex].price;
    const prevQuantity = cart.products[productIndex].quantity;

    const result = await Cart.updateOne({
      user_id: userId,
    }, {
      $pull: {
        products: {
          product_id: productId,
        },
      },
      total_price: cart.total_price - prevPrice * prevQuantity,
    });

    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

module.exports = {
  getByUserId,
  addProduct,
  modifyQuantity,
  emptyCart,
  removeProduct,
};
