const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
  products:[{
    product_id: {type: mongoose.Schema.Types.ObjectId, ref:'Product' },
    quantity: {type: Number},
    price: {type: Number}
  }],
  total_price: {type: Number}
}, {timestamps: true});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;