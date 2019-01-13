import React from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const Footer = props => {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        foo bar
      </Typography>
    </footer>
  );
};

export default withStyles(styles)(Footer);