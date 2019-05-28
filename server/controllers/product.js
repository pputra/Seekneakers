const Product = require('../models/Product');
const Category = require('../models/Category');
const { sortByQueryType } = require('../helpers/product');

module.exports = {
  getAll: (req, res) => {
    Product.find().populate('category_id', 'name').populate('reviews').then((products) => {
      const { sort_by } = req.query;
      if (sort_by) {
        sortByQueryType(sort_by, products);
      }
      
      res.status(200).json({message: 'products has been fetched', products});
    }).catch((err) => {
      res.status(400).json({message: 'unable to fetch products'});
    });
  },
  getById: (req, res) => {
    const { id } = req.params;

    const populateReviewOptions= {
      path: 'reviews',
      populate: {
        path: 'user_id',
        model: 'User',
        select: ['first_name', 'last_name']
      },
    };
    
    Product
      .findOne({_id: id})
      .populate('category_id', 'name')
      .populate(populateReviewOptions)
      .exec().then((product) => {
        res.status(200).json({message: 'product has been fetched', product});
    })
    .catch((err) => {
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
      const newProduct = await new Product({
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
  updateById: async (req, res) => {
    const {
      name,
      price,
      image_src,
      description,
      category_id,
      stock,
    } = req.body;
    const { id } = req.params;
  
    try {
      const prevProduct = await Product.findOne({_id: id});
      const result = await Product.updateOne({_id: id}, {
        name,
        price,
        image_src,
        description,
        category_id,
        stock,
      }, {runValidators: true});

      if (prevProduct.category_id != category_id) {
        await Category.updateOne({_id: prevProduct.category_id}, {$pull: {products: id}});
        await Category.updateOne({_id: category_id}, {$push: {products: id}});
      }

      res.status(200).json({message: `product with id: ${id} has been updated`, data: result});
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  },
  deleteById: (req, res) => {
    const { id } = req.params;

    Product.deleteOne({_id: id}).then((result) => {
      res.status(202).json({message: `product with id: ${id} has been deleted`, data: result});
    }).catch((err) => {
      res.status(400).json({message: err.message});
    });
  },
  restockById: (req, res) => {
    const { id } = req.params;

    Product.updateOne({_id: id}, {
      stock: 10,
    }).then((result) => {
      res.status(200).json({message: `product with id: ${id} has been restocked`, data: result});
    }).catch((err) => {
      res.status(400).json({message: err.message});
    });
  }
};