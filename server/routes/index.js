const router = require('express').Router();
const auth = require('./auth');
const address = require('./address');
const cart = require('./cart');
const category = require('./category');
const product = require('./product');
const order = require('./order');
const shipping = require('./shipping');
const { isLogin } = require('../middlewares/auth');

router.get('/', (req, res, next) => {
  res.status(200).json('home');
});

router.use('/auth', auth);
router.use('/categories', category);
router.use('/products', product);

router.use(isLogin);
router.use('/address', address);
router.use('/cart', cart);
router.use('/order', order);
router.use('/shipping', shipping);

module.exports = router;
