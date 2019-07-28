const statusCode = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
};

const successMessage = {
  // user actions
  USER_HAS_BEEN_CREATED: 'user has been sucessfully registered',
  LOGIN: 'user has been sucessfully logged in',
  FETCH_USER_INFO: 'user info has been fetched',
  // cart actions
  FETCH_CART: 'cart has been fetched successfully',
  ADD_PRODUCT_TO_CART: 'product has been added to the cart',
  UPDATE_PRODUCT_QUANTITY_IN_CART: 'cart has been updated',
};

const errMessage = {
  PASSWORD_DONT_MATCH: "passwords don't match",
  INVALID_REGISTRATION_INFO: 'invalid registration info',
  CREATE_CART_FAILED: 'unable to generate a cart for this user',
  INVALID_LOGIN_INFO: 'invalid email or password',
  INVALID_TOKEN: 'invalid token',
  PRODUCT_OUT_OF_STOCK: 'product is out of stock',
  EXCEED_STOCK_CAPACITY: 'unable to exceed stock capacity',
  PRODUCT_TO_REMOVE_NOT_IN_CART: 'unable to locate the product',
};

module.exports = {
  statusCode,
  successMessage,
  errMessage,
};
