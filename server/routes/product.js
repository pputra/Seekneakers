const router = require('express').Router();
const { isAdmin } = require('../middlewares/auth');
const { getAll, getById, create, updateById, deleteById } = require('../controllers/product');

router.get('/', getAll);
router.get('/:id', getById);
router.use(isAdmin);
router.post('/', create);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;