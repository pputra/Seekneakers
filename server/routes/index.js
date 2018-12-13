const router = require('express').Router();

router.get('/', function(req, res, next) {
  res.status(200).json('home');
});

module.exports = router;
