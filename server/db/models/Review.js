const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, maxlength: [200, 'title max length: 200'] },
  content: { type: String, required: true, maxlength: [600, 'content max length: 600'] },
  rating: { type: Number, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
