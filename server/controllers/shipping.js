const { getShippingRates } = require('../helpers/shipping');

module.exports = {
  getOptions: async (req, res) => {
    const availableRates = await getShippingRates(req);

    if (!availableRates || availableRates.length === 0) {
      return res.status(400).json({message: 'invalid shipping info'});
    }

    res.status(200).json({
      message: 'rate has been fetched successfully', 
      availableRates,
    });
  }
};