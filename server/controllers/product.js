/* eslint-disable no-underscore-dangle */
const { sortByQueryType } = require('../helpers/product');
const productAction = require('../actions/product.action');
const { statusCode, successMessage, errMessage } = require('../helpers/httpResponse');

module.exports = {
  getAll: async (req, res) => {
    try {
      const { keywords, sort_by: sortBy } = req.query;
      let products;

      if (keywords) {
        products = await productAction.getByKeywords(keywords);
      } else {
        products = await productAction.getAll();
      }

      if (sortBy) {
        sortByQueryType(sortBy, products);
      }

      res.status(statusCode.ok).json({
        message: successMessage.FETCH_PRODUCTS,
        products,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: errMessage.FETCH_PRODUCTS,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await productAction.getById(id);
      res.status(statusCode.ok).json({
        message: successMessage.FETCH_PRODUCT,
        product,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: errMessage.FETCH_PRODUCT,
      });
    }
  },
  create: async (req, res) => {
    try {
      const {
        name,
        price,
        image_src: imageSrc,
        description,
        category_id: categoryId,
      } = req.body;

      const newProduct = await productAction.create(name, price, imageSrc, description, categoryId);
      res.status(statusCode.created).json({
        message: successMessage.CREATE_PRODUCT,
        product: newProduct,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  updateById: async (req, res) => {
    try {
      const {
        name,
        price,
        image_src: imageSrc,
        description,
        category_id: categoryId,
        stock,
      } = req.body;

      const { id } = req.params;

      const result = await productAction.updateById(name, price, imageSrc,
        description, categoryId, stock, id);

      res.status(statusCode.ok).json({
        message: successMessage.UPDATE_PRODUCT_BY_ID(id),
        data: result,
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
      const result = await productAction.deleteById(id);
      res.status(statusCode.ok).json({
        message: successMessage.REMOVE_PRODUCT_BY_ID(id),
        data: result,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
  restockById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await productAction.restockById(id, 10);
      res.status(200).json({
        message: successMessage.RESTOCK_PRODUCT_BY_ID(id),
        data: result,
      });
    } catch (e) {
      res.status(statusCode.badRequest).json({
        message: e.message,
      });
    }
  },
};
