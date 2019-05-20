import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { 
  fetchProducts,
  restockProductById,
} from '../../store/actions/product';
import { addProductToCartById } from '../../store/actions/cart';

import ProductList from './ProductList';
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
    anchorEl: null,
  };

  componentDidMount() {
    const { onFetchProducts } = this.props;
    onFetchProducts();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { 
      classes, 
      history, 
      products, 
      onProductAddedToCartById, 
      onRestockProductById,
    } = this.props;

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
          <ProductList 
            history={history}
            products={products} 
            handleAddProductToCart={onProductAddedToCartById}
            handleRestockProduct={onRestockProductById}
          />
        </div>
      </Fragment>
    );
  };
};

const mapStateToProps = state => ({
  products: state.productsReducer.products,
});

const mapDispatchToProps = dispatch => ({
  onFetchProducts: () => dispatch(fetchProducts()),
  onProductAddedToCartById: (productId, history) => dispatch(addProductToCartById(productId, history)),
  onRestockProductById: (productId) => dispatch(restockProductById(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));