const router = require('express').Router();
const { getById, create, updateById, deleteById } = require('../controllers/address');

router.get('/:id', getById);
router.post('/', create);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;