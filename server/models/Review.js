const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
 user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
 title: {type: String},
 content: {type: String},
 rating: {type:Number, required: true},
 like: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
 dislike: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
},{timestamps:true});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;