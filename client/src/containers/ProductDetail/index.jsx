import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
  fetchProductDetailByid,
  restockProductById,
  leaveProductDetailPage,
} from '../../store/actions/product';
import { addProductToCartById } from '../../store/actions/cart';
import { 
  handleReviewForm,
  submitReview,
  deleteReview,
  setCurrentEditId,
  editReview,
  cancelEditReview,
  voteReview,
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

  onEditReview = () => {
    const {
      editReview,
      currEditId,
      match: {params: {productId}},
      editTitle,
      editContent,
      editRating,
    } = this.props;

    const data = {
      productId,
      reviewId: currEditId, 
      title: editTitle,
      content: editContent,
      rating: editRating,
    };

    editReview(data);
  }

  componentWillUnmount() {
    const { leaveProductDetailPage } = this.props;
    leaveProductDetailPage();
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
      voteReview,
      cancelEditReview,
      setCurrentEditId,
      currEditId,
      editTitle,
      editContent,
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
          onSetCurrentEditId={setCurrentEditId}
          currEditId={currEditId}
          editTitle={editTitle}
          editContent={editContent}
          onEditReview={this.onEditReview}
          onCancelEditReview={cancelEditReview}
          onVoteReview={voteReview}
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

  currEditId: state.reviewReducer.currEditId,
  editTitle: state.reviewReducer.editTitle,
  editContent: state.reviewReducer.editContent,
  editRating: state.reviewReducer.editRating,
});

const mapDispatchToProps = dispatch => ({
  fetchProductDetailByid: (productId) => dispatch((fetchProductDetailByid(productId))),
  addProductToCartById: (productId) => dispatch(addProductToCartById(productId)),
  restockProductById: (productId, isFromDetailPage) => dispatch(restockProductById(productId, isFromDetailPage)),
  handleReviewForm: (key, value) => dispatch(handleReviewForm(key, value)),
  submitReview: (data) => dispatch(submitReview(data)),
  deleteReview: (reviewId, productId) => dispatch(deleteReview(reviewId, productId)),
  setCurrentEditId: (reviewId, prevTitle, prevContent, prevRating) => 
    dispatch(setCurrentEditId(reviewId, prevTitle, prevContent, prevRating)),
  editReview: (data) => dispatch(editReview(data)),
  cancelEditReview: () => dispatch(cancelEditReview()),
  leaveProductDetailPage: () => dispatch(leaveProductDetailPage()),
  voteReview: (type, reviewId, productId) => dispatch(voteReview(type, reviewId, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetail));