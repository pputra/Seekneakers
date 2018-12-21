const User = require('../models/User');
const Cart = require('../models/Cart');

const { encrypt } = require('../helpers/encryption');
const { createUserErr } = require('../helpers/errCatcher');
const { generateToken } = require('../helpers/jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    const { first_name, last_name, email, password, password_repeat } = req.body;

    if (password !== password_repeat) {
      return res.status(400).json({message: "passwords don't match"});
    }
    
    let newUser = '';

    try {
       newUser = await new User({ first_name, last_name, email, password }).save();
    } catch (err) {
      res.status(400).json({message: createUserErr(err)});
    }

    try {
      await new Cart({ user_id: newUser._id, total_price: 0 }).save();
      res.status(200).json({message: 'user has been sucessfully registered'});
    } catch (err) {
      await User.deleteOne({ _id: newUser._id});
      res.status(400).json({message: 'unable to generate a cart for this user'});
    }
  },
  login: (req, res) => {
    const { email, password } = req.body;

    User.findOne({email: email, password: encrypt(password)}).then((user) => {
      if (user) {
        let token = generateToken(user._id, email);
        res.status(200).json({message: 'user has been sucessfully logged in', token });
      } else {
        res.status(400).json({message: 'invalid email or password'});
      }
    }).catch(() => {
      res.status(400).json({message: 'invalid email or password'});
    });
  }
};