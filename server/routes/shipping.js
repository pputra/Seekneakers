const router = require('express').Router();

const { getOptions } = require('../controllers/shipping');

router.post('/', getOptions);

module.exports = router;