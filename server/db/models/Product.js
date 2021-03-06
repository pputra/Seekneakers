const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image_src: { type: String },
  description: { type: String },
  stock: { type: Number, default: 0, required: true },
  available: { type: Boolean, default: true },
  purchased: { type: Number, default: 0, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
