/* eslint-disable no-underscore-dangle */
const Product = require('../models/Product');
const Category = require('../models/Category');
const { sortByQueryType } = require('../helpers/product');

module.exports = {
  getAll: (req, res) => {
    const { keywords } = req.query;

    if (keywords) {
      module.exports.getByKeywords(res, keywords);
      return;
    }

    Product.find().populate('category_id', 'name').populate('reviews').then((products) => {
      const { sort_by: sortBy } = req.query;
      if (sortBy) {
        sortByQueryType(sortBy, products);
      }

      res.status(200).json({ message: 'products have been fetched', products });
    })
      .catch(() => {
        res.status(400).json({ message: 'unable to fetch products' });
      });
  },
  getById: (req, res) => {
    const { id } = req.params;

    const populateReviewOptions = {
      path: 'reviews',
      populate: {
        path: 'user_id',
        model: 'User',
        select: ['first_name', 'last_name'],
      },
    };

    Product
      .findOne({ _id: id })
      .populate('category_id', 'name')
      .populate(populateReviewOptions)
      .exec()
      .then((product) => {
        res.status(200).json({ message: 'product has been fetched', product });
      })
      .catch(() => {
        res.status(400).json({ message: 'unable to fetch products' });
      });
  },
  getByKeywords: (res, keywords) => {
    const options = {
      name: new RegExp(keywords, 'i'),
    };

    Product.find(options, 'name image_src').then((products) => {
      res.status(200).json({
        message: 'products have been fetched',
        products,
      });
    }).catch(() => {
      res.status(400).json({ message: 'unable to fetch products' });
    });
  },
  create: async (req, res) => {
    const {
      name,
      price,
      image_src: imageSrc,
      description,
      category_id: categoryId,
    } = req.body;

    try {
      const newProduct = await new Product({
        name,
        price,
        image_src: imageSrc,
        description,
        category_id: categoryId,
      }).save();
      await Category.updateOne({ _id: categoryId }, { $push: { products: newProduct._id } });
      res.status(201).json({ message: 'product has been added', product: newProduct });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  updateById: async (req, res) => {
    const {
      name,
      price,
      image_src: imageSrc,
      description,
      category_id: categoryId,
      stock,
    } = req.body;
    const { id } = req.params;

    try {
      const prevProduct = await Product.findOne({ _id: id });
      const result = await Product.updateOne({ _id: id }, {
        name,
        price,
        image_src: imageSrc,
        description,
        category_id: categoryId,
        stock,
      }, { runValidators: true });

      // eslint-disable-next-line eqeqeq
      if (prevProduct.category_id != categoryId) {
        await Category.updateOne({ _id: prevProduct.category_id }, { $pull: { products: id } });
        await Category.updateOne({ _id: categoryId }, { $push: { products: id } });
      }

      res.status(200).json({ message: `product with id: ${id} has been updated`, data: result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  deleteById: (req, res) => {
    const { id } = req.params;

    Product.deleteOne({ _id: id }).then((result) => {
      res.status(202).json({ message: `product with id: ${id} has been deleted`, data: result });
    }).catch((err) => {
      res.status(400).json({ message: err.message });
    });
  },
  restockById: (req, res) => {
    const { id } = req.params;

    Product.updateOne({ _id: id }, {
      stock: 10,
    }).then((result) => {
      res.status(200).json({ message: `product with id: ${id} has been restocked`, data: result });
    }).catch((err) => {
      res.status(400).json({ message: err.message });
    });
  },
};
