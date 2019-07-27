const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer: {
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    name: {type: String, required: true},
  },
  address: {
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true},
    country: {type: String, required: true},
  },
  products: [{
    product_id: {type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
  }],
  courier: {
    provider: {type: String, required: true},
    service_name: {type: String, required: true},
    price: {type: Number, required: true},
  },
  total_price: {type: Number, required: true}
}, {timestamps: true});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;