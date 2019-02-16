const User = require('../models/User');
const { hasValidToken } = require('../helpers/jsonwebtoken');

module.exports = {
  isLogin: (req, res, next) => {
    const decoded = hasValidToken(req.headers.token);

    if (decoded) {
      req.decoded = decoded;
      next();
    } else {
      res.status(401).json({message: "You must login first"});
    }
  },
  isAdmin: (req, res, next) => {
    const decoded = hasValidToken(req.headers.token);
    
    if (decoded) {
      User.findOne({_id: decoded.userId, role: "admin"}).then((admin) => {
        if (admin) {
          req.decoded = decoded;
          next();
        } else {
          res.status(401).json({message: "You are not authorized to access this content"});
        }
      }).catch(() => {
        res.status(401).json({message: "You are not authorized to access this content"});
      });
    } else {
      res.status(401).json({message: "You must login first"});
    }
  },
};