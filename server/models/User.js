const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { encrypt } = require('../helpers/encryption');
const { hasValidEmail, hasValidPassword } = require('../helpers/validator');

const UserSchema = new Schema({
  first_name: { type: String, required: [true, 'first name is required'] },
  last_name: { type: String, required: [true, 'last name is required'] },
  email: { type: String, required: [true, 'email is required'], unique: true },
  password: { type: String, required: [true, 'invalid password'], minlength: 5},
  addresses: [{ type: mongoose.Types.ObjectId, ref:'Address' }],
  oauth: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
  cart: { type: mongoose.Types.ObjectId, ref:'Cart' },
  orders: [{ type: mongoose.Types.ObjectId, ref:'Order' }],
});

UserSchema.pre('validate', function(next) {
  if (!hasValidEmail(this.email)) {
    next(new Error('invalid email'))
  } else if (!hasValidPassword(this.password)) {
    next(new Error('invalid password'))
  }
  return next();
});

UserSchema.pre('save', function(next) {
  this.password = encrypt(this.password);
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;