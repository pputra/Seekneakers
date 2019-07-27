const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  street: {type: String, required: [true, 'street is required']},
  city: {type: String, required: [true, 'city is required']},
  state: {type: String, required: [true, 'state is required']},
  zip: {type: String, required: [true, 'zip is required']},
  country: { type: String, required: [true, 'country is required']},
}, {timestamps: true});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;