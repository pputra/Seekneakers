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
  USER_HAS_BEEN_CREATED: 'user has been sucessfully registered',
  LOGIN: 'user has been sucessfully logged in',
  FETCH_USER_INFO: 'user info has been fetched',
};

const errMessage = {
  PASSWORD_DONT_MATCH: "passwords don't match",
  INVALID_REGISTRATION_INFO: 'invalid registration info',
  CREATE_CART_FAILED: 'unable to generate a cart for this user',
  INVALID_LOGIN_INFO: 'invalid email or password',
  INVALID_TOKEN: 'invalid token',
};

module.exports = {
  statusCode,
  successMessage,
  errMessage,
};
