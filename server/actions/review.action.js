/* eslint-disable eqeqeq */
const Review = require('../models/Review');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { hasValidRating } = require('../helpers/validator');
const { errMessage } = require('../helpers/httpResponse');

const create = (userId, productId, title,
  content, rating) => new Promise(async (resolve, reject) => {
  try {
    if (!hasValidRating(rating)) {
      throw new Error(errMessage.INVALID_REVIEW_RATING);
    }

    const product = await Product.findOne({ _id: productId }).populate('reviews');

    if (!product) {
      throw new Error(errMessage.INVALID_PRODUCT_ID);
    }

    const conditions = {
      'customer.user_id': userId,
      products: {
        $elemMatch: {
          product_id: {
            $in: [productId],
          },
        },
      },
    };

    const userOrder = await Order.findOne(conditions);

    if (!userOrder) {
      throw new Error(errMessage.USER_HAS_NOT_PURCHASED_PRODUCT);
    }

    const hasPrevReview = product.reviews
      .findIndex(el => (el.user_id == userId)) !== -1;

    if (hasPrevReview) {
      throw new Error(errMessage.USER_HAS_REVIEWED_THE_PRODUCT);
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

    return resolve(newReview);
  } catch (e) {
    return reject(e);
  }
});

const updateById = (userId, id, title,
  content, rating) => new Promise(async (resolve, reject) => {
  try {
    const result = await Review.updateOne({ _id: id, user_id: userId }, {
      title,
      content,
      rating,
    }, { runValidators: true });

    const notAuthorized = result.n === 0;

    if (notAuthorized) {
      throw new Error(errMessage.USER_UNAUTHORIZED_TO_UPDATE_THE_REVIEW);
    }

    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

const deleteById = (userId, id) => new Promise(async (resolve, reject) => {
  try {
    const result = await Review.deleteOne({ _id: id, user_id: userId });

    const notAuthorized = result.n === 0;

    if (notAuthorized) {
      throw new Error(errMessage.USER_UNAUTHORIZED_TO_UPDATE_THE_REVIEW);
    }

    const conditions = {
      reviews: {
        $in: [id],
      },
    };

    const docs = {
      $pull: {
        reviews: id,
      },
    };

    await Product.updateOne(conditions, docs);

    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

const like = (userId, id) => new Promise(async (resolve, reject) => {
  try {
    const review = await Review.findOne({ _id: id });

    if (!review) {
      throw new Error('invalid review id');
    }

    const prevLikeIndex = review.likes.findIndex(el => (
      el == userId
    ));

    const removeLike = prevLikeIndex !== -1;

    if (removeLike) {
      review.likes.splice(prevLikeIndex, 1);

      await review.save();

      return resolve(review);
    }

    const dislikeIndexToRemove = review.dislikes.findIndex(el => (
      el == userId
    ));

    const removePrevDislike = dislikeIndexToRemove !== -1;

    if (removePrevDislike) {
      review.dislikes.splice(dislikeIndexToRemove, 1);
    }

    review.likes.push(userId);

    await review.save();

    return resolve(review);
  } catch (e) {
    return reject(e);
  }
});

const dislike = (userId, id) => new Promise(async (resolve, reject) => {
  try {
    const review = await Review.findOne({ _id: id });

    if (!review) {
      throw new Error('invalid review id');
    }

    const prevDislikeIndex = review.dislikes.findIndex(el => (
      el == userId
    ));

    const removeDislike = prevDislikeIndex !== -1;

    if (removeDislike) {
      review.dislikes.splice(prevDislikeIndex, 1);

      await review.save();

      return resolve(review);
    }

    const likeIndexToRemove = review.likes.findIndex(el => (
      el == userId
    ));

    const removePrevLike = likeIndexToRemove !== -1;

    if (removePrevLike) {
      review.likes.splice(likeIndexToRemove, 1);
    }

    review.dislikes.push(userId);

    await review.save();

    return resolve(review);
  } catch (e) {
    return reject(e);
  }
});

module.exports = {
  create,
  updateById,
  deleteById,
  like,
  dislike,
};
