const router = require('express').Router();
const {
  create,
  updateById,
  deleteById,
} = require('../controllers/review');

router.post('/:id', create);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;