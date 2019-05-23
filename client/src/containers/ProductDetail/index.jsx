import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
  fetchProductDetailByid,
  restockProductById,
} from '../../store/actions/product';
import { addProductToCartById } from '../../store/actions/cart';

import ProductDetailCard from '../../components/Cards/ProductDetail';
import styles from './styles';
import { 
  withStyles, 
  Typography, 
  Paper,
  Avatar,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  NativeSelect,
} from '@material-ui/core';

const reviewContent= "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

class ProductDetail extends Component {
  componentDidMount() {
    const { 
      fetchProductDetailByid,
      match: {params: {productId}}
    } = this.props;
    fetchProductDetailByid(productId);
  }
  
  render() {
    const { 
      classes,
      match: {params: {productId}},
      product,
      addProductToCartById,
      restockProductById,
    } = this.props;

    return (
      <div className={classes.flexContainer}>
        <ProductDetailCard 
          imageSrc={product.image_src}
          name={product.name}
          price={product.price}
          stock={product.stock}
          rating={product.rating}
          description={product.description}
          addProductToCartById={() => addProductToCartById(productId)}
          restockProductById={() => restockProductById(productId, true)}
        />
        <div style={{width: '40%', justifyContent:'center', alignItems:'center', display:'flex', marginTop:'1%', flexDirection:'column'}}>
          <Paper style={{width:'100%'}}>
            <div style={{marginTop:10, marginLeft:10}}>
              <Typography variant="title">Leave a review</Typography>
            </div>
            <div style={{margin:10}}>
              <FormControl width={"100%"}>
                <InputLabel>Rating</InputLabel>
                <NativeSelect>
                  <option value={1}>1</option>
                  <option value={1}>2</option>
                  <option value={1}>3</option>
                </NativeSelect>
              </FormControl>
            </div>
            <div style={{margin:10, marginTop:0}}>
              <TextField
                id="outlined-multiline-flexible"
                label="Title"
                multiline
                rowsMax="4"
                value={"lol"}
                //onChange={this.handleChange('multiline')}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </div>
            <div style={{margin:10, marginTop:0}}>
              <TextField
                id="outlined-multiline-flexible"
                label="Content"
                multiline
                rowsMax="4"
                value={"lol"}
                //onChange={this.handleChange('multiline')}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </div>
          </Paper>
        </div>
        <div style={{width: '40%', justifyContent:'center', alignItems:'center', display:'flex', marginTop:'1%'}}>
          <Paper style={{width:'100%',}}>
            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
              <Avatar style={{margin:10}}>J</Avatar>
              <Typography>John Doe</Typography>
            </div>
            <div style={{marginLeft:10, display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
              <div style={{marginRight:10}}>
                <Typography>rating: 5</Typography>
              </div>
              <div>
                <Typography variant="subtitle2">NICE PRODUCT</Typography>
              </div>
            </div>
            <Divider />
            <div style={{margin:10}}>
              <Typography>{reviewContent}</Typography>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.productDetailReducer.product,
});

const mapDispatchToProps = dispatch => ({
  fetchProductDetailByid: (productId) => dispatch((fetchProductDetailByid(productId))),
  addProductToCartById: (productId) => dispatch(addProductToCartById(productId)),
  restockProductById: (productId, isFromDetailPage) => dispatch(restockProductById(productId, isFromDetailPage))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetail));