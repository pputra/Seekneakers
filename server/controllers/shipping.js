const axios = require('axios');

module.exports = {
  getOptions: (req, res) => {
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

    const address_to = {
      name,
      street1: street,
      city,
      state,
      zip,
      country,
      phone,
      email
    };

    const address_from = {
      name: "Seekneakers co.",
      street1: "1234 st",
      city: "San Jose",
      state: "CA",
      zip: "95122",
      country: "US",
      phone: "2128976799",
      email: "seekneakers@dummy.com"
    }

    const parcels = [
      {
        length: 10,
            width: 15,
            "height": 10,
            "distance_unit": "in",
            "weight": 3,
            "mass_unit": "lb"
      }
    ];

    axios({
      method: 'POST',
      url:'https://api.goshippo.com/shipments/',
      data: {
        address_to,
        address_from,
        parcels,
        async: "false"
      },
      headers: {
        Authorization: process.env.SHIPPING_TOKEN 
      }
    }).then((result) => {
      const { rates } = result.data;
      let availabeRates = [];
      
      rates.forEach(rate => {
        const {
          provider,
          provider_image_200,
          servicelevel: {name},
          estimated_days,
          duration_terms,
          amount
        } = rate

        availabeRates.push({
          provider,
          name,
          image: provider_image_200,
          estimated_days,
          duration_terms,
          price: amount
        });
      });

      res.status(200).json({
        message: 'rate has been fetched successfully', 
        availabeRates,
      });
          
    }).catch((err) => {
      res.status(400).json({message: err.message});
    });
  }
};