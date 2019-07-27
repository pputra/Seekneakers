const router = require('express').Router();
const { 
  isAdmin, 
  isLogin, 
} = require('../middlewares/auth');
const { 
  getAll, 
  getById, 
  create, 
  updateById, 
  deleteById,
  restockById, 
} = require('../controllers/product');

router.get('/', getAll);
router.get('/:id', getById);
router.patch('/:id', isLogin, restockById);
router.use(isAdmin);
router.post('/', create);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;