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
  // category actions
  CATEGORY_HAS_BEEN_CREATED: 'Category has been created successfully',
  FETCH_CATEGORIES: 'categories has been fetched',
  FETCH_CATEGORY: 'category has been fetched',
  UPDATE_CATEGORY_NAME_BY_ID: id => (`category with id: ${id} has been updated`),
  DELETE_CATEGORY_BY_ID: id => (`category with id: ${id} has been deleted`),
  // product actions
  FETCH_PRODUCTS: 'products has been fetched',
  FETCH_PRODUCT: 'product has been fetched',
  RESTOCK_PRODUCT_BY_ID: id => (`product with id: ${id} has been restocked`),
  CREATE_PRODUCT: 'product has been added',
  UPDATE_PRODUCT_BY_ID: id => (`product with id: ${id} has been updated`),
  REMOVE_PRODUCT_BY_ID: id => (`product with id: ${id} has been removed`),
  // address actions
  CREATE_ADDRESS: 'address has been added',
  FETCH_ADDRESS: 'address has been fetched',
  UPDATE_ADDRESS_BY_ID: id => (`address with id: ${id} has been updated`),
  REMOVE_ADDRESS_BY_ID: id => (`address with id: ${id} has been removed`),
  // shipping actions
  FETCH_SHIPPING_RATES: 'shipping rates has been fetched successfully',
  // review actions
  CREATE_REVIEW: 'review has been created',
  UPDATE_REVIEW_BY_ID: id => (`review with id: ${id} has been updated`),
  REMOVE_REVIEW_BY_ID: id => (`review with id: ${id} has been removed`),
  LIKE_REVIEW_BY_ID: id => (`like review with id: ${id} has been toggled`),
  DISLIKE_REVIEW_BY_ID: id => (`dislike review with id: ${id} has been toggled`),
  // order actions
  FETCH_ORDER_HISTORY: 'orders have been fetched successfully',
  PLACE_ORDER: 'your order has been placed',
};

const errMessage = {
  // user
  PASSWORD_DONT_MATCH: "passwords don't match",
  INVALID_REGISTRATION_INFO: 'invalid registration info',
  CREATE_CART_FAILED: 'unable to generate a cart for this user',
  INVALID_LOGIN_INFO: 'invalid email or password',
  INVALID_TOKEN: 'invalid token',
  // cart
  PRODUCT_OUT_OF_STOCK: 'product is out of stock',
  EXCEED_STOCK_CAPACITY: 'unable to exceed stock capacity',
  PRODUCT_TO_REMOVE_NOT_IN_CART: 'unable to locate the product',
  // category
  FETCH_CATEGORIES: 'unable to fetch categories',
  FETCH_CATEGORY: 'unable to fetch category',
  // product actions,
  FETCH_PRODUCTS: 'unable to fetch products',
  FETCH_PRODUCT: 'unable to fetch the product',
  FETCH_ADDRESS_UNAUTHORIZED: 'user is not authorized to access the address',
  UPDATE_ADDRESS_UNAUTHORIZED: 'User is not authorized to update the address',
  REMOVE_ADDRESS_UNAUTHORIZED: 'user is not authorized to remove the address',
  // shipping actions
  FETCH_SHIPPING_RATES: 'invalid shipping info',
  // review actions
  INVALID_REVIEW_RATING: 'rating must be an integer between 1-5',
  INVALID_PRODUCT_ID: 'invalid product id',
  USER_HAS_NOT_PURCHASED_PRODUCT: 'user has not purchased this product',
  USER_HAS_REVIEWED_THE_PRODUCT: 'user has reviewed this product before',
  USER_UNAUTHORIZED_TO_UPDATE_THE_REVIEW: 'user is not authorized to update the review',
  USER_HAS_EMPTY_CART_TO_CHECKOUT: 'unable to proccess order: cart is empty',
  // order actions
  USER_HAS_EMPTY_INFO: 'all user info must be filled',
  // rabbitmq
  FAILED_QUEUE_CONNECTION: 'unable to establish a connection to the server, please try again later',
};

module.exports = {
  statusCode,
  successMessage,
  errMessage,
};
