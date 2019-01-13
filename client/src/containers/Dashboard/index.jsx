import React, { Component, Fragment } from 'react';

import ProductCard from '../../components/Cards/Product';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Dashboard extends Component {
  state = {
    cardIterators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {  cardIterators, anchorEl } = this.state;
    const { classes } = this.props;
    
    return (
      <Fragment>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid  className={classes.filterMenu} container spacing={16} justify="flex-start">
            <Grid item>
              <Button 
                variant="outlined" 
                color="default"
                onClick={this.handleClick}
              >
                <Typography>
                  Sort By
                </Typography>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Typography>
                    Price: Low to high
                  </Typography>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Typography>
                    Price: High to low
                  </Typography>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Typography>
                    Rating
                  </Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <Grid container spacing={40}>
            {cardIterators.map(card => (
              <Grid item key={card} sm={6} md={4} lg={3}>
                <ProductCard
                  imageSrc="https://static.highsnobiety.com/wp-content/uploads/2018/02/02184722/favorite-all-black-sneakers-buy-online-01-1200x800.jpg"
                  brand="Nike"
                  name="Air Force One"
                  price={100}
                  fn={() => alert('nice')}
                />
              </Grid>
            ))}
          </Grid>
      </div>
    </Fragment>
    );
  };
};

export default withStyles(styles)(Dashboard);