const router = require('express').Router();
const {
  create,
  updateById,
  deleteById,
  like,
  dislike,
} = require('../controllers/review');

router.patch('/like/:id', like);
router.patch('/dislike/:id', dislike);
router.post('/:id', create);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;