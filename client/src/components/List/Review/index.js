import React from 'react';

import styles from './styles';
import {
  withStyles,
  Paper,
  Avatar,
  Typography,
  Divider,
} from '@material-ui/core';

const ReviewList = props => {
  const {
    classes,
    firstName,
    lastName,
    title,
    content,
    rating,
  } = props;
  
  const initial = firstName[0];

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
    </Paper>
  );
}

export default withStyles(styles)(ReviewList);