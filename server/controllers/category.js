
const categoryAction = require('../actions/category.action');
const { statusCode, successMessage, errMessage } = require('../helpers/httpResponse');

module.exports = {
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const result = await categoryAction.create(name);
      res.status(statusCode.created).json({
        message: successMessage.CATEGORY_HAS_BEEN_CREATED,
        category: result,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const categories = await categoryAction.getAll();
      res.status(statusCode.ok).json({
        message: successMessage.FETCH_CATEGORY,
        categories,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: errMessage.FETCH_CATEGORY,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoryAction.getById(id);
      res.status(statusCode.ok).json({
        message: successMessage.FETCH_CATEGORY,
        category,
      });
    } catch (e) {
      res.status(400).json({
        message: errMessage.FETCH_CATEGORY,
      });
    }
  },
  updateById: async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const result = await categoryAction.updateNameById(id, name);
      res.status(statusCode.ok).json({
        message: successMessage.UPDATE_CATEGORY_NAME_BY_ID(id),
        result,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await categoryAction.deleteById(id);
      res.status(statusCode.ok).json({
        message: successMessage.DELETE_CATEGORY_BY_ID(id),
        data: result,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
};
