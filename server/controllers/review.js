const Review = require('../models/Review');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { hasValidRating } = require('../helpers/validator');

module.exports = {
  create: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    const {
      title,
      content,
      rating,
    } = req.body;

    if (!hasValidRating(rating)) {
      res.status(400).json({
        message: 'rating must be an integer between 1-5',
      });
    }

    try {
      const product = await Product.findOne({_id: id}).populate('reviews');

      if (!product) {
        res.status(400).json({
          message: 'invalid product id'
        });
        return;
      }

      const conditions = {
        'customer.user_id': userId,
        products: {
          '$elemMatch': {
            product_id: {
              '$in': [id]
            }
          }
        }
      };

      const userOrder = await Order.findOne(conditions);
     
      if (!userOrder) {
        res.status(400).json({
          message: 'user has not purchased this product'
        });
        return;
      }

      const hasPrevReview = product.reviews
        .findIndex((el) => (el.user_id == userId)) !== -1;

      if (hasPrevReview) {
        res.status(400).json({
          message: 'user has reviewed this product before',
        });
        return;
      }
      
      const newReview = new Review({
        user_id: userId,
        title,
        content,
        rating,
      });

      await newReview.save();

      product.reviews.push(newReview);

      product.save();

      res.status(201).json({
        message: 'review has been created',
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  },
  updateById: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    const {
      title,
      content,
      rating,
    } = req.body;

    try {
      const result = await Review.updateOne({_id: id, user_id: userId}, {
        title,
        content,
        rating,
      }, {runValidators: true});

      const notAuthorized = result.n === 0;

      if (notAuthorized) {
        res.status(401).json({
          message: 'User is not authorized to update the review',
        });
        return;
      }

      res.status(200).json({
        message: 'review has been updated'
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  },
  deleteById: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;

    try {
      const result = await Review.deleteOne({_id: id, user_id: userId});

      const notAuthorized = result.n === 0;

      if (notAuthorized) {
        res.status(401).json({
          message: 'User is not authorized to delete the review',
        });
        return;
      }

      const conditions = {
        reviews: {
          '$in': [id]
        }
      };

      const docs = {
        '$pull': {
          reviews: id
        }
      }

      await Product.updateOne(conditions, docs);

      res.status(200).json({
        message: 'review has been removed',
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  },
  like: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    let review;

    try {
      review = await Review.findOne({_id: id});

      if (!review) {
        res.status(400).json({
          message: 'invalid review id',
        });
        return;
      }
    } catch (err) {
      res.status(400).json({
        message: 'invalid review id',
      });
    }
    
    const prevLikeIndex = review.likes.findIndex((id) => (
      id == userId
    ));

    if (prevLikeIndex !== -1) {
      review.likes.splice(prevLikeIndex, 1);

      try {
        await review.save();

        res.status(200).json({
          message: 'you have unliked this review'
        });
      } catch (err) {
        res.status(500).json({
          message: err.message
        });
      }
      return;
    }

    const dislikeIndexToRemove = review.dislikes.findIndex((id)=> (
      id == userId
    ));

    if (dislikeIndexToRemove !== -1 ) {
      review.dislikes.splice(dislikeIndexToRemove, 1);
    }

    review.likes.push(userId);

    try {
      await review.save();

      res.status(200).json({
        message: 'review has been liked successfully'
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  dislike: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    let review;

    try {
      review = await Review.findOne({_id: id});

      if (!review) {
        res.status(400).json({
          message: 'invalid review id',
        });
        return;
      }
    } catch (err) {
      res.status(400).json({
        message: 'invalid review id',
      });
    }

    const prevDislikeIndex = review.dislikes.findIndex((id) => (
      id == userId
    ));

    if (prevDislikeIndex !== -1) {
      review.dislikes.splice(prevDislikeIndex, 1);

      try {
        await review.save();

        res.status(200).json({
          message: 'you have undisliked this review'
        });
      } catch (err) {
        res.status(500).json({
          message: err.message
        });
      }
      return;
    }

    const likeIndexToRemove = review.likes.findIndex((id)=> (
      id == userId
    ));

    if (likeIndexToRemove !== -1 ) {
      review.likes.splice(likeIndexToRemove, 1);
    }

    review.dislikes.push(userId);

    try {
      await review.save();

      res.status(200).json({
        message: 'review has been disliked successfully'
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
};
