const crypto = require('crypto');

module.exports = {
  encrypt: password => (
    crypto
      .createHmac(process.env.CRYPTO_ALGORITHM, process.env.CRYPTO_SECRET)
      .update(password)
      .digest('hex')
  ),
};
