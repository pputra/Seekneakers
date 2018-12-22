const Category = require('../models/Category');

module.exports = {
  create: (req, res) => {
    const { name }  = req.body;

    let newCategory = new Category({name});

    newCategory.save().then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send(err);
    });
  },
  getAll: (req, res) => {
    Category.find().populate('products').then((categories) => {
      res.status(200).json({message: 'categories has been fetched', categories})
    }).catch((err) => {
      res.status(400).json({message: 'unable to fetch categories'});
    });
  },
  getById: () => {
    const { id } = req.params;

    Category.findOne({_id: id}).then((category) => {
      res.status(200).json({message: 'category has been fetched', category});
    }).catch((err) => {
      res.status(400).json({message: 'unable to fetch the category'});
    });
  },
  updateById: () => {
    const { name } = req.body;
    const { id } = req.params;

    Category.updateOne({_id: id}, {name}, {runValidators: true}).then((result) => {
      res.status(200).json({message: `category with id: ${id} has been updated`, data: result});
    }).catch((err) => {
      res.status(400).json({message: err.message});
    });
  },
  deleteById: (req, res) => {
    const { id } = req.params;

    Category.deleteOne({_id: id}).then((result) => {
      res.status(202).json({message: `category with id: ${id} has been deleted`, data: result});
    }).catch((err) => {
      res.status(400).json({message: err.message});
    });
  }
};