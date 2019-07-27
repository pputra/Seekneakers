const router = require('express').Router();

const { login, register, getUserInfo } = require('../controllers/auth');
const { isLogin } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/user-info', isLogin, getUserInfo);

module.exports = router;