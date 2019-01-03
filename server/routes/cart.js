const router = require('express').Router();
const { getCart, addProduct, modifyAmount, removeProduct } = require('../controllers/cart');

router.get('/', getCart);
router.put('/:id', addProduct);
router.patch('/:id', modifyAmount);
router.delete('/:id', removeProduct);

module.exports = router;