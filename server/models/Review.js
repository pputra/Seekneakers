const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
 user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
 title: {type: String, required: true},
 content: {type: String, required: true},
 rating: {type: Number, required: true},
 likes: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
 dislikes: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
},{timestamps:true});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;