const router = require('express').Router();

const { getAll, create } = require('../controllers/order');
const { verifyShippingInfo, hasNonEmptyCart } = require('../middlewares/orderValidators');

router.get('/', getAll);
router.post('/', verifyShippingInfo, hasNonEmptyCart, create);

module.exports = router;
