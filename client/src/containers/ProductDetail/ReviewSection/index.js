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
    onSetCurrentEditId,
    onEditReview,
    onCancelEditReview,
    currEditId,
    editTitle,
    editContent,
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
        {reviews && reviews.map((review) => {
          const editInputs =[
            {
              value: editTitle,
                key: 'editTitle',
                type: 'title',
                label: 'Title',
            }, 
            {
              value: editContent,
              key: 'editContent',
              type: 'content',
              label: 'Content',
            }
          ]
          
          if (currEditId === review._id) {
            return (
              <ReviewForm 
                inputs={editInputs}
                handleChange={handleReviewForm}
                formTitle={'Edit your review'}
                submitLabel={'Edit'}
                onSubmit={onEditReview}
                productId={productId}
                editMode={true}
                onCancel={onCancelEditReview}
              />
            );
          }

          return (
            <ReviewList
              reviewId= {review._id}
              firstName={review.user_id.first_name}
              lastName={review.user_id.last_name}
              title={review.title}
              content={review.content}
              rating={review.rating}
              userId={review.user_id._id}
              onDelete={onDeleteReview}
              onSetCurrentEditId={() => onSetCurrentEditId(review._id, review.title, review.content, review.rating)}
              currEditId={currEditId}
              productId={productId}
            />
          );
        })}
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(ReviewSection);