import React from 'react';

import ProductCard from '../../../components/Cards/Product';
import { Grid } from '@material-ui/core';

const Productlist = props => {
  const { 
    products, 
    handleAddProductToCart,
    handleRestockProduct,
    history,
  } = props;
  
  return (
    <Grid container spacing={40}>
      {products.map(product => (
        <Grid 
          item key={product._id} 
          sm={6} 
          md={4} 
          lg={3} 
        >
          <ProductCard
            imageSrc={product.image_src}
            brand={product.category_id.name}
            name={product.name}
            price={product.price}
            stock={product.stock}
            addProductToCart={() => handleAddProductToCart(product._id)}
            restockProduct={() => handleRestockProduct(product._id)}
            showDetail={() => history.push(`product/${product._id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Productlist;