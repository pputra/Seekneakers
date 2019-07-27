import React from 'react';

import styles from './styles';
import {
  withStyles,
  Paper,
  Avatar,
  Typography,
  Divider,
  Button,
  Icon,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

const ReviewList = props => {
  const {
    classes,
    reviewId,
    firstName,
    lastName,
    title,
    content,
    rating,
    likes,
    dislikes,
    userId,
    onVoteReview,
    onDelete,

    productId,
    onSetCurrentEditId,
  } = props;
  
  const initial = firstName[0];
  const currUserId = localStorage.getItem('user_id');
  const hasLiked = likes.indexOf(currUserId) !== -1;
  const hasDisliked = dislikes.indexOf(currUserId) !== -1;
  const voteColor = '#f50057';
  const likeButtonStyle = hasLiked && {backgroundColor: voteColor, color:'white'};
  const dislikeButtonStyle = hasDisliked && {backgroundColor: voteColor, color:'white'};

  return (
    <Paper className={classes.root}>
      <div className={classes.username}>
        <Avatar style={{margin:10}}>{initial}</Avatar>
        <Typography>{firstName} {lastName}</Typography>
      </div>
      <div className={classes.title}>
        <div style={{marginRight:10}}>
          <Typography>rating: {rating}</Typography>
        </div>
        <div>
          <Typography variant="subtitle2">{title.toUpperCase()}</Typography>
        </div>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography>{content}</Typography>
      </div>
      <div className={classes.actions}>
        <div>
          <Button 
            variant="outlined" 
            style={{...likeButtonStyle}}
            onClick={() => onVoteReview('like', reviewId, productId)}
          >
             <Icon>
               <ThumbUp />
             </Icon>
            ({likes.length})
          </Button>
          <Button 
            variant="outlined" 
            style={{...dislikeButtonStyle, marginLeft:10,}}
            onClick={() => onVoteReview('dislike', reviewId, productId)}
          >
            <Icon>
              <ThumbDown />
            </Icon>
            ({dislikes.length})
          </Button>
        </div>
        {currUserId === userId &&
          <div>
            <Button 
              variant="outlined" 
              style={{marginRight:10}}
              onClick={onSetCurrentEditId}
            >
              edit
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => onDelete(reviewId, productId)}
            >
              <Icon>
                <Delete />
              </Icon>
            </Button>
          </div>
        }
      </div>
    </Paper>
  );
}

export default withStyles(styles)(ReviewList);