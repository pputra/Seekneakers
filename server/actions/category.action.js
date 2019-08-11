const Category = require('../db/models/Category');

const create = name => new Promise(async (resolve, reject) => {
  try {
    const newCategory = await new Category({ name });

    return resolve(newCategory);
  } catch (e) {
    return reject(e);
  }
});

const getAll = () => new Promise(async (resolve, reject) => {
  try {
    const categories = await Category.find();
    return resolve(categories);
  } catch (e) {
    return reject(e);
  }
});

const getById = id => new Promise(async (resolve, reject) => {
  try {
    const category = await Category.findOne({ _id: id }).populate('products');
    return resolve(category);
  } catch (e) {
    return reject(e);
  }
});

const updateNameById = (id, name) => new Promise(async (resolve, reject) => {
  try {
    const updatedCategory = await Category
      .updateOne({ _id: id }, { name }, { runValidators: true });
    return resolve(updatedCategory);
  } catch (e) {
    return reject(e);
  }
});

const deleteById = id => new Promise(async (resolve, reject) => {
  try {
    const result = await Category.deleteOne({ _id: id });
    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

module.exports = {
  create,
  getAll,
  getById,
  updateNameById,
  deleteById,
};
