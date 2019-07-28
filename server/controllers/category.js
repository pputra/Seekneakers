const Category = require('../models/Category');

module.exports = {
  create: (req, res) => {
    const { name } = req.body;

    const newCategory = new Category({ name });

    newCategory.save().then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send(err);
    });
  },
  getAll: (req, res) => {
    Category.find().then((categories) => {
      res.status(200).json({ message: 'categories has been fetched', categories });
    }).catch(() => {
      res.status(400).json({ message: 'unable to fetch categories' });
    });
  },
  getById: (req, res) => {
    const { id } = req.params;

    Category.findOne({ _id: id }).populate('products').then((category) => {
      res.status(200).json({ message: 'category has been fetched', category });
    }).catch(() => {
      res.status(400).json({ message: 'unable to fetch the category' });
    });
  },
  updateById: (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    Category.updateOne({ _id: id }, { name }, { runValidators: true }).then((result) => {
      res.status(200).json({ message: `category with id: ${id} has been updated`, data: result });
    }).catch((err) => {
      res.status(400).json({ message: err.message });
    });
  },
  deleteById: (req, res) => {
    const { id } = req.params;

    Category.deleteOne({ _id: id }).then((result) => {
      res.status(202).json({ message: `category with id: ${id} has been deleted`, data: result });
    }).catch((err) => {
      res.status(400).json({ message: err.message });
    });
  },
};
