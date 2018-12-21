const router = require('express').Router();
const { register, login } = require('../controllers/auth');

router.get('/', function(req, res, next) {
  res.status(200).json('home');
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
