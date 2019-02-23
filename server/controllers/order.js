const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
  getAll: (req, res) => {
    const { userId } = req.decoded;
    
    User.findOne({_id: userId}).populate('orders').then((user) => {
      const orders = user.orders;
      res.status(200).json({message: 'Orders have been fetched successfully', orders});
    }).catch((err) => {
      res.status(401).json({message: 'You are not authorized to access this content'});
    });
  },
  create: async (req, res) => {
    const { userId } = req.decoded;
    let cart;
    const {
      name,
      street,
      city,
      state,
      zip,
      country,
      provider,
      service_name,
      price
    } = req.body;

    try {
      cart = await Cart.findOne({user_id: userId}).populate('products.product_id');
    } catch (error) {
      res.status(401).json({message: 'You are not authorized to access this content'});
    }

    const emptyCart = cart.products.length == 0;

    if (emptyCart) {
      res.status(400).json({message: 'cart is empty'});
    }

    const { products } = cart;
    let totalPrice = 0;

    let orderedProducts = [];

    for (product of products) {
      const { product_id : {price}, quantity} = product;
      
      let addedProduct = {
        product_id: product.product_id._id,
        price
      };

      const currStock = product.product_id.stock;

      if (currStock === 0) {
        continue;
      }

      if (quantity >= currStock) {
        addedProduct.quantity = currStock;
        
        try {
          await Product.updateOne({_id: product.product_id._id}, {stock: 0, $inc: {purchased: currStock}});
          totalPrice += currStock * price;
        } catch (err) {
          return res.status(400).json({message: err.message});
        }
      } else {
        const updatedStock = currStock - quantity;
        addedProduct.quantity = quantity;

        try {
          await Product.updateOne({_id: product.product_id._id}, {
            stock: updatedStock, 
            $inc: {
              purchased: quantity
            }
            });

            totalPrice += quantity * price;
        } catch (err) {
          return res.status(400).json({message: err.message});
        }
      }
      
      orderedProducts.push(addedProduct);
    }

    const productsOutOfStock = orderedProducts.length === 0;

    if (productsOutOfStock) {
      return res.status(400).json({message: 'Products are out of stock'});
    }

    cart.products = [];

    try {
      await cart.save();
    } catch (err) {
      res.status(400).json({message: err.message});
    }
    
    try {
      const addedOrder = await Order.create({
        customer: {
          user_id: userId,
          name,
        },
        address: {
          street,
          city,
          state,
          zip,
          country,
        },
        products:orderedProducts,
        courier: {
          provider,
          service_name,
          price,
        },
        total_price: totalPrice + price
      });

      await User.updateOne({_id: userId}, {
        $push: {
          orders: addedOrder._id,
        }
      });

      res.status(200).json({
        message: 'Your order has been placed',
        order: addedOrder,
      })
      
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }
};