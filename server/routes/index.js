const router = require('express').Router();
const address = require('./address');
const cart = require('./cart');
const category = require('./category');
const product = require('./product');

const { register, login } = require('../controllers/auth');

router.get('/', function(req, res, next) {
  res.status(200).json('home');
});

router.post('/register', register);
router.post('/login', login);
//todo add middlewares
router.use('/address', address);
router.use('/cart', cart);

router.use('/categories', category);
router.use('/products', product);

module.exports = router;
