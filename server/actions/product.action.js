/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const Product = require('../db/models/Product');
const Category = require('../db/models/Category');

const getAll = () => new Promise(async (resolve, reject) => {
  try {
    const products = await Product.find().populate('category_id', 'name').populate('reviews');
    return resolve(products);
  } catch (e) {
    return reject(e);
  }
});

const getByKeywords = keywords => new Promise(async (resolve, reject) => {
  try {
    const options = {
      name: new RegExp(keywords, 'i'),
    };

    const products = await Product.find(options, 'name image_src');
    return resolve(products);
  } catch (e) {
    return reject(e);
  }
});

const getById = id => new Promise(async (resolve, reject) => {
  try {
    const populateReviewOptions = {
      path: 'reviews',
      populate: {
        path: 'user_id',
        model: 'User',
        select: ['first_name', 'last_name'],
      },
    };

    const product = await Product
      .findOne({ _id: id })
      .populate('category_id', 'name')
      .populate(populateReviewOptions)
      .exec();
    return resolve(product);
  } catch (e) {
    return reject(e);
  }
});

const restockById = (id, numStock) => new Promise(async (resolve, reject) => {
  try {
    const result = await Product.updateOne({ _id: id }, {
      stock: numStock,
    });
    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

const create = (name, price, imageSrc,
  description, categoryId) => new Promise(async (resolve, reject) => {
  try {
    const newProduct = await new Product({
      name,
      price,
      image_src: imageSrc,
      description,
      category_id: categoryId,
    }).save();
    await Category.updateOne({ _id: categoryId }, { $push: { products: newProduct._id } });
    return resolve(newProduct);
  } catch (e) {
    return reject(e);
  }
});

const updateById = (name, price, imageSrc, description,
  categoryId, stock, productId) => new Promise(async (resolve, reject) => {
  try {
    const prevProduct = await Product.findOne({ _id: productId });
    const result = await Product.updateOne({ _id: productId }, {
      name,
      price,
      image_src: imageSrc,
      description,
      category_id: categoryId,
      stock,
    }, { runValidators: true });

    // eslint-disable-next-line eqeqeq
    if (prevProduct.category_id != categoryId) {
      await Category.updateOne({ _id: prevProduct.category_id },
        { $pull: { products: productId } });
      await Category.updateOne({ _id: categoryId }, { $push: { products: productId } });
    }

    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

const deleteById = productId => new Promise(async (resolve, reject) => {
  try {
    const result = await Product.deleteOne({ _id: productId });
    return resolve(result);
  } catch (e) {
    return reject(e);
  }
});

const getProductsInStock = products => new Promise(async (resolve, reject) => {
  try {
    let totalPrice = 0;
    const productsInStock = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const product of products) {
      const { product_id: { price }, quantity } = product;

      const addedProduct = {
        product_id: product.product_id._id,
        price,
      };

      const { stock: currStock } = await getById(product.product_id._id);

      if (currStock === 0) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (quantity >= currStock) {
        addedProduct.quantity = currStock;

        await Product.updateOne({ _id: product.product_id._id },
          { stock: 0, $inc: { purchased: currStock } });
        totalPrice += currStock * price;
      } else {
        const updatedStock = currStock - quantity;
        addedProduct.quantity = quantity;

        await Product.updateOne({ _id: product.product_id._id }, {
          stock: updatedStock,
          $inc: {
            purchased: quantity,
          },
        });

        totalPrice += quantity * price;
      }

      productsInStock.push(addedProduct);
    }
    return resolve({
      totalPrice,
      productsInStock,
    });
  } catch (e) {
    return reject(e);
  }
});

module.exports = {
  getAll,
  getByKeywords,
  getById,
  restockById,
  create,
  updateById,
  deleteById,
  getProductsInStock,
};
