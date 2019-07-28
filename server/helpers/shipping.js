const axios = require('axios');
const { hasEmptyField } = require('../helpers/validator');

module.exports = {
  getShippingRates: async (req) => {
    const {
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
    } = req.body;

    const fields = {
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
    };

    if (hasEmptyField(fields)) {
      return [];
    }

    const addressTo = {
      name,
      street1: street,
      city,
      state,
      zip,
      country,
      phone,
      email,
    };

    const addressFrom = {
      name: 'Seekneakers co.',
      street1: '1234 st',
      city: 'San Jose',
      state: 'CA',
      zip: '95122',
      country: 'US',
      phone: '2128976799',
      email: 'seekneakers@dummy.com',
    };

    const parcels = [
      {
        length: 10,
        width: 15,
        height: 10,
        distance_unit: 'in',
        weight: 3,
        mass_unit: 'lb',
      },
    ];

    try {
      const result = await axios({
        method: 'POST',
        url: 'https://api.goshippo.com/shipments/',
        data: {
          address_to: addressTo,
          address_from: addressFrom,
          parcels,
          async: 'false',
        },
        headers: {
          Authorization: process.env.SHIPPING_TOKEN,
        },
      });

      const { rates } = result.data;
      const availableRates = [];

      rates.forEach((rate) => {
        const {
          provider,
          provider_image_200: image,
          servicelevel: { name: serviceName },
          estimated_days: estimatedDays,
          duration_terms: durationTerms,
          amount,
        } = rate;

        availableRates.push({
          provider,
          name: serviceName,
          image,
          estimated_days: estimatedDays,
          duration_terms: durationTerms,
          price: amount,
        });
      });

      return availableRates;
    } catch (err) {
      return [];
    }
  },
};
