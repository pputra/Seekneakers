const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (userId, email) => jwt.sign({ userId, email }, process.env.JWT_SECRET),
  hasValidToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return false;
    }
  },
};
