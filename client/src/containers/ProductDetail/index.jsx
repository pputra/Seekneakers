import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
  fetchProductDetailByid,
  restockProductById,
} from '../../store/actions/product';
import { addProductToCartById } from '../../store/actions/cart';
import { 
  handleReviewForm,
  submitReview,
  deleteReview,
} from '../../store/actions/review';

import ProductDetailCard from '../../components/Cards/ProductDetail';
import ReviewSection from './ReviewSection';
import styles from './styles';
import { withStyles } from '@material-ui/core';

class ProductDetail extends Component {
  onSubmitReview = () => {
    const {
      submitReview,
      match: {params: {productId}},
      title,
      content,
      rating,
    } = this.props;

    const data = {
      productId, 
      title, 
      content, 
      rating
    };

    submitReview(data);
  }

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
      handleReviewForm,
      deleteReview,
      rating,
      title,
      content,
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
        <ReviewSection 
          reviews={product.reviews}
          handleReviewForm={handleReviewForm}
          rating={rating}
          title={title}
          content={content}
          onSubmitReview={this.onSubmitReview}
          productId={productId}
          onDeleteReview={deleteReview}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.productDetailReducer.product,
  rating: state.reviewReducer.rating,
  title: state.reviewReducer.title,
  content: state.reviewReducer.content,
});

const mapDispatchToProps = dispatch => ({
  fetchProductDetailByid: (productId) => dispatch((fetchProductDetailByid(productId))),
  addProductToCartById: (productId) => dispatch(addProductToCartById(productId)),
  restockProductById: (productId, isFromDetailPage) => dispatch(restockProductById(productId, isFromDetailPage)),
  handleReviewForm: (key, value) => dispatch(handleReviewForm(key, value)),
  submitReview: (data) => dispatch(submitReview(data)),
  deleteReview: (reviewId, productId) => dispatch(deleteReview(reviewId, productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetail));