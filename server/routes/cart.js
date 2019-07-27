const router = require('express').Router();
const { getCart, addProduct, modifyQuantity, removeProduct } = require('../controllers/cart');

router.get('/', getCart);
router.put('/:id', addProduct);
router.patch('/:id', modifyQuantity);
router.delete('/:id', removeProduct);

module.exports = router;