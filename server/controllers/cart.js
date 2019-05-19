const Cart = require('../models/Cart');
const Product = require('../models/Product');

module.exports = {
  getCart: async (req, res) => {
    const { userId } = req.decoded;
    
    try {
      const cart = await Cart.findOne({user_id: userId}).populate('products.product_id');
      
      if (!cart) {
        return res.status(401).json({message: 'user is not authorized to access the cart'});
      }

      const { products } = cart;
      let updatedTotalPrice = 0;

      products.forEach(product => {
        const { product_id : {price}, quantity} = product;
        product.price = price;
        updatedTotalPrice += price * quantity;
      });
      
      cart.total_price = updatedTotalPrice;
      
      await cart.save();
      res.status(200).json({message: 'cart has been fetched successfully', cart}); 
    } catch (err) {
      res.status(401).json({message: err.message});
    }
  },
  addProduct: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    let cart;
    
    try {
      cart = await Cart.findOne({user_id: userId}).populate('products.product_id');
      
      if (!cart) {
        return res.status(401).json({message: 'user is not authorized to access the cart'});
      }
    } catch (err) {
      res.status(401).json({message: err.message});
    }

    const { products } = cart;
    let updatedTotalPrice = 0;

    products.forEach(product => {
      const { product_id : {price}, quantity} = product;
      product.price = price;
      updatedTotalPrice += price * quantity;
    });
    
    cart.total_price = updatedTotalPrice;
    
    await cart.save();

    const productIndex = products.findIndex(product => (product.product_id._id == id));

    if (productIndex === -1) {
      let newProductPrice;
      try {
        const productToAdd = await Product.findOne({_id: id});
        newProductPrice = productToAdd.price;
      } catch (err) {
        res.status(400).json({message: err.message});
      }
      cart.products.push({product_id: id, quantity: 1, price: newProductPrice});

      cart.total_price += newProductPrice;
    } else {
      if (products[productIndex].product_id.stock <= products[productIndex].quantity) {
        return res.status(400).json({message: 'unable to exceed stock capacity'});
      }
      
      products[productIndex].quantity++;

      cart.total_price += products[productIndex].price;
    }
    await cart.save(); 

    res.status(200).json({message:'product has been added to the cart'});
  },
  modifyQuantity: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    const { newQuantity } = req.body;
    let cart;
    
    try {
      cart = await Cart.findOne({user_id: userId}).populate('products.product_id');
      
      if (!cart) {
        return res.status(401).json({message: 'user is not authorized to access the cart'});
      }
    } catch (err) {
      res.status(401).json({message: err.message});
    }

    const { products } = cart;
    let updatedTotalPrice = 0;

    products.forEach(product => {
      const { product_id : {price}, quantity} = product;
      product.price = price;
      updatedTotalPrice += price * quantity;
    });
    
    cart.total_price = updatedTotalPrice;
    
    await cart.save();

    const productIndex = cart.products.findIndex(product => (product.product_id._id == id));
    const prevQuantity = cart.products[productIndex].quantity;
    const { price, stock } = cart.products[productIndex].product_id;
   
    if (newQuantity <= 0 || newQuantity > stock) {
      return res.status(400).json({message: 'invalid product quantity'});
    }

    try {
      await Cart.updateOne({
        user_id: userId,
        'products.product_id': id
      }, {
        $set: {
          'products.$.quantity': newQuantity
        },
        total_price: cart.total_price - (price * prevQuantity) + (price * newQuantity)
      });
    } catch (err) {
      res.status(400).json({message: err.message});
    }
    
    res.status(200).json({message: 'cart has been updated'});
  },
  removeProduct: async (req, res) => {
    const { userId } = req.decoded;
    const { id } = req.params;
    const { empty_cart } = req.query;
    let cart;

    try {
      cart = await Cart.findOne({user_id: userId}).populate('products.product_id');
      
      if (!cart) {
        return res.status(401).json({message: 'user is not authorized to access the cart'});
      }
    } catch (err) {
      res.status(401).json({message: err.message});
    }

    if (empty_cart === 'true') {
      cart.products = [];

      await cart.save();

      return res.status(200).json({message: 'cart has been emptied'});
    }

    const { products } = cart;
    let updatedTotalPrice = 0;

    products.forEach(product => {
      const { product_id : {price}, quantity} = product;
      product.price = price;
      updatedTotalPrice += price * quantity;
    });
    
    cart.total_price = updatedTotalPrice;
    
    await cart.save();

    const productIndex = products.findIndex(product => (product.product_id._id == id));
    
    if (productIndex === -1) {
      return res.status(400).json({message: 'unable to locate the product'});
    }

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