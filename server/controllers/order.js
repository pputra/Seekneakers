const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');
const { getShippingRates } = require('../helpers/shipping');
const { hasEmptyField } = require('../helpers/validator');

module.exports = {
  getAll: (req, res) => {
    const { userId } = req.decoded;
    
    User.findOne({_id: userId}).populate({
      path:'orders',
      model:"Order",
      populate:[{
          path:"products",
     },
     {
          path: "products.product_id",
          model:"Product",
     }]}).then((user) => {
      const orders = user.orders.reverse();
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
      shippingIndex
    } = req.body;

    const fields ={
      name,
      street,
      city,
      state,
      zip,
      country,
      shippingIndex
    }

    if (hasEmptyField(fields)) {
      res.status(400).json({
        message: 'all user info must be filled'
      });
      return;
    }

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

    const availableRates = await getShippingRates(req);

    if (!availableRates || availableRates.length === 0) {
      return res.status(500).json({message: 'Unable to verify shipping options'});
    }

    const chosenRate = availableRates[Number(shippingIndex)];
    
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
          provider: chosenRate.provider,
          service_name: chosenRate.name,
          price: chosenRate.price,
        },
        total_price: totalPrice + Number(chosenRate.price),
      });

      await User.updateOne({_id: userId}, {
        $push: {
          orders: addedOrder._id,
        }
      });

      cart.products = [];

      await cart.save();

      res.status(200).json({
        message: 'Your order has been placed',
        order: addedOrder,
      })
      
    } catch (err) {
      res.status(400).json({message: 'all user info must be filled'});
    }
  }
};