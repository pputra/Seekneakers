import React, { Fragment } from 'react';

import ReviewForm from './Form';
import ReviewList from '../../../components/List/Review';
import styles from './styles';
import { withStyles } from '@material-ui/core';

const ReviewSection = props => {
  const {
    classes,
    reviews,
    productId,
    handleReviewForm,
    onSubmitReview,
    onDeleteReview,
    title,
    content,
  } = props;

  const inputs = [
    {
      value: title,
        key: 'title',
        type: 'title',
        label: 'Title',
    }, 
    {
      value: content,
      key: 'content',
      type: 'content',
      label: 'Content',
    }
  ];

  return (
    <Fragment>
      <div className={classes.reviewForm}>
        <ReviewForm 
          inputs={inputs}
          handleChange={handleReviewForm}
          formTitle={'Leave a review'}
          submitLabel={'submit'}
          onSubmit={onSubmitReview}
          productId={productId}
        />
      </div>
      <div className={classes.reviewList}>
        {reviews && reviews.map((review) => (
          <ReviewList
            reviewId= {review._id}
            firstName={review.user_id.first_name}
            lastName={review.user_id.last_name}
            title={review.title}
            content={review.content}
            rating={review.rating}
            userId={review.user_id._id}
            onDelete={onDeleteReview}
            productId={productId}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(ReviewSection);