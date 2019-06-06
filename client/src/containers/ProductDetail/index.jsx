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

import WithLoading from '../../hoc/WithLoading';
import ProductDetailCardComponent from '../../components/Cards/ProductDetail';
import ReviewSectionComponent from './ReviewSection';
import styles from './styles';
import { withStyles } from '@material-ui/core';

const ProductDetailCard = WithLoading(ProductDetailCardComponent);
const ReviewSection = WithLoading(ReviewSectionComponent);

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

  calculateAvgRating = (reviews) => {
    if (!reviews) {
      return;
    }
    
    let sum = 0;
    let count = 0;
  
    reviews.forEach(review => {
      sum += review.rating;
      count++;
    });

    return count === 0 ? "not yet rated" : (sum/count).toFixed(1);
  }

  componentDidMount() {
    const { 
      fetchProductDetailByid,
      match: {params: {productId}}
    } = this.props;
    fetchProductDetailByid(productId);
  }
  
  componentDidUpdate(prevProps) {
    const { fetchProductDetailByid } = this.props;
    const prevProductId = prevProps.match.params.productId;
    const currProductId = this.props.match.params.productId;
    const shouldUpdatePage = currProductId !== prevProductId;

    if (shouldUpdatePage) {
      fetchProductDetailByid(currProductId);
    }
  }

  componentWillUnmount() {
    const { leaveProductDetailPage } = this.props;
    leaveProductDetailPage();
  }
  
  render() {
    const { 
      classes,
      isProductLoading,
      isReviewLoading,
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
          isLoading={isProductLoading}
          imageSrc={product.image_src}
          name={product.name}
          price={product.price}
          stock={product.stock}
          rating={this.calculateAvgRating(product.reviews)}
          description={product.description}
          addProductToCartById={() => addProductToCartById(productId)}
          restockProductById={() => restockProductById(productId, true)}
        />
        <ReviewSection 
          reviews={product.reviews}
          isLoading={isReviewLoading}
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
  isProductLoading: state.productDetailReducer.loading,

  currEditId: state.reviewReducer.currEditId,
  editTitle: state.reviewReducer.editTitle,
  editContent: state.reviewReducer.editContent,
  editRating: state.reviewReducer.editRating,
  isReviewLoading: state.reviewReducer.loading,
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