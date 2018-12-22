const Product = require('../models/Product');
const Category = require('../models/Category');
module.exports = {
  getAll: (req, res) => {
    Product.find().then((products) => {
      res.status(200).json({message: 'products has been fetched', products});
    }).catch((err) => {
      res.status(400).json({message: 'unable to fetch products'});
    });
  },
  getById: (req, res) => {
    const { id } = req.params;

    Product.findOne({_id: id}).then((product) => {
      res.status(200).json({message: 'product has been fetched', product});
    }).catch((err) => {
      res.status(400).json({message: 'unable to fetch products'});
    });
  },
  create: async (req, res) => {
    const {
      name,
      price,
      image_src,
      description,
      category_id,
    } = req.body;

    try {
      let newProduct = await new Product({
        name,
        price,
        image_src,
        description,
        category_id,
      }).save();
      await Category.updateOne({_id: category_id}, {$push: {products: newProduct._id}});
      res.status(201).json({message: 'product has been added', product: newProduct});
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  },
  updateById: (req, res) => {
    const {
      name,
      price,
      image_src,
      description,
      category_id,
    } = req.body;
    const { id } = req.params;

    Product.updateOne({_id: id}, {
      name,
      price,
      image_src,
      description,
      category_id,
    }, {runValidators: true}).then((result) => {
      res.status(200).json({message: `product with id: ${id} has been updated`, data: result});
    }).catch((err) => {
      res.status(400).json({message: err.message});
    });
  },
  deleteById: (req, res) => {
    const { id } = req.params;

    Product.deleteOne({_id: id}).then((result) => {
      res.status(202).json({message: `product with id: ${id} has been deleted`, data: result});
    }).catch((err) => {
      res.status(400).json({message: err.message});
    });
  }
};