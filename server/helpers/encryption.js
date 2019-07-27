const crypto = require('crypto');

module.exports = {
  encrypt: (password) => {
    return crypto
      .createHmac(process.env.CRYPTO_ALGORITHM, process.env.CRYPTO_SECRET)
      .update(password)
      .digest('hex');
  },
};