/* eslint-disable eqeqeq */
const reviewAction = require('../actions/review.action');
const { statusCode, successMessage } = require('../helpers/httpResponse');

module.exports = {
  create: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const { id: productId } = req.params;
      const {
        title,
        content,
        rating,
      } = req.body;

      await reviewAction.create(userId, productId, title, content, rating);
      res.status(statusCode.created).json({
        message: successMessage.CREATE_REVIEW,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  updateById: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const { id } = req.params;
      const {
        title,
        content,
        rating,
      } = req.body;

      await reviewAction.updateById(userId, id, title, content, rating);
      res.status(statusCode.ok).json({
        message: successMessage.UPDATE_REVIEW_BY_ID(id),
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const { id } = req.params;

      await reviewAction.deleteById(userId, id);
      res.status(statusCode.ok).json({
        message: successMessage.REMOVE_REVIEW_BY_ID(id),
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  like: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const { id } = req.params;

      await reviewAction.like(userId, id);

      res.status(statusCode.ok).json({
        message: successMessage.LIKE_REVIEW_BY_ID(id),
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  dislike: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const { id } = req.params;

      await reviewAction.dislike(userId, id);

      res.status(statusCode.ok).json({
        message: successMessage.DISLIKE_REVIEW_BY_ID(id),
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
};
