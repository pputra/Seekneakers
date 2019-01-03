const Cart = require('../models/Cart');
const Product = require('../models/Product');

module.exports = {
  getCart: async (req, res) => {
    const { userId } = req.body;
    
    try {
      const cart = await Cart.findOne({user_id: userId}).populate('products.product_id');
      
      if (!cart) {
        return res.status(401).json({message: 'user is not authorized to access the cart'});
      }

      res.status(200).json({message: 'cart has been fetched successfully', cart}); 
    } catch (err) {
      res.status(401).json({message: err.message});
    }
  },
  addProduct: async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;
    let cart;
    
    try {
      cart = await Cart.findOne({user_id: userId}).populate('products');
      
      if (!cart) {
        return res.status(401).json({message: 'user is not authorized to access the cart'});
      }
    } catch (err) {
      res.status(401).json({message: err.message});
    }

    let updatedTotalPrice = 0;

    for (const product of cart.products) {
      const productToCheck = await Product.findOne({_id: product.product_id});

      updatedTotalPrice += product.quantity * productToCheck.price;
    }

    const productIndex = cart.products.findIndex((product) => (product.product_id == id));
    const productToAdd = await Product.findOne({_id: id});
    const productPrice = productToAdd.price;

    if (productIndex === -1 ) {
      await Cart.updateOne({user_id: userId}, 
        {
          $push: {
            products: {product_id: id, quantity: 1, price: productPrice}
          }, 
          total_price: updatedTotalPrice + total_price
        });
    } else {

      cart.products[productIndex].quantity++;
      cart.products[productIndex].price = productPrice;
      cart.total_price = updatedTotalPrice + productPrice;

      await cart.save(); 
    }
    res.status(200).json({message:'product has been added to the cart'});
  },
  modifyAmount: async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;
    const { newAmount } = req.body;
    let cart;
    let productToUpdate;

    try {
      cart = await Cart.findOne({user_id: userId}).populate('products');
      
      if (!cart) {
        return res.status(401).json({message: 'user is not authorized to access the cart'});
      }
    } catch (err) {
      res.status(401).json({message: err.message});
    }

    try {
      productToUpdate = await Product.findOne({_id: id});
    } catch (err) {
      res.status(400).json({message: err.message});
    }

    const productIndex = cart.products.findIndex((product) => (product.product_id == id));
    const prevPrice = cart.products[productIndex].price;
    const prevQuantity = cart.products[productIndex].quantity;
    const { price } = productToUpdate;

    if (newAmount <= 0 || newAmount > 10) {
      return res.status(400).json({message: 'invalid product amount'});
    }

    try {
      await Cart.updateOne({
        user_id: userId,
        'products.product_id': id
      }, {
        $set: {
          'products.$.quantity': newAmount
        },
        total_price: cart.total_price - (prevPrice * prevQuantity) + (price * newAmount)
      });
    } catch (err) {
      res.status(400).json({message: err.message});
    }
    
    res.status(200).json({message: 'cart has been updated'});
  },
  removeProduct: async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;
    let cart;

    try {
      cart = await Cart.findOne({user_id: userId}).populate('products');
      
      if (!cart) {
        return res.status(401).json({message: 'user is not authorized to access the cart'});
      }
    } catch (err) {
      res.status(401).json({message: err.message});
    }

    const productIndex = cart.products.findIndex((product) => (product.product_id == id));
    const prevPrice = cart.products[productIndex].price;
    const prevQuantity = cart.products[productIndex].quantity;

    try {
      await Cart.updateOne({
        user_id: userId
      }, {
        $pull: {
          products: {
            product_id: id
          }
        },
        total_price: cart.total_price - prevPrice * prevQuantity
      });

      res.status(200).json({message: 'cart has been updated'});
    } catch (err) {
      res.status(401).json({message: err.message});
    }
  }
};