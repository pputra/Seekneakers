const router = require('express').Router();

const { getAll, create } = require('../controllers/order');

router.get('/', getAll);
router.post('/', create);

module.exports = router;
