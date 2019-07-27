import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { 
  fetchProducts,
  restockProductById,
  sortProducts,
} from '../../store/actions/product';
import {
  addProductToCartById ,
} from '../../store/actions/cart';

import WithLoading from '../../hoc/WithLoading';
import SortMenus from './SortMenus';
import ProductListComponent from './ProductList';
import styles from './styles';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const ProductList = WithLoading(ProductListComponent);

class Dashboard extends Component {
  state = {
    anchorEl: null,
  };

  componentDidMount() {
    const { onFetchProducts } = this.props;
    onFetchProducts();
  }

  handleShowSortMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseSortMenu = () => {
    this.setState({ anchorEl: null });
  }

  handleProductSorting = (sortBy) => {
    const { onSortProducts } = this.props
    this.setState({ anchorEl: null });
    onSortProducts(sortBy);
  };

  render() {
    const { anchorEl } = this.state;
    const { 
      classes, 
      history, 
      products, 
      onProductAddedToCartById, 
      onRestockProductById,
      isLoading,
    } = this.props;

    const sortTypes = [
      {
        label: 'Price: Low to high',
        fn: () => this.handleProductSorting('price_ascending')
      },
      {
        label: 'Price: High to low',
        fn: () => this.handleProductSorting('price_descending')
      },
      {
        label: 'Name: A to Z',
        fn: () => this.handleProductSorting('name_ascending')
      },
      {
        label: 'Name: Z to A',
        fn: () => this.handleProductSorting('name_descending')
      },
      {
        label: 'Rating',
        fn: () => this.handleProductSorting('rating')
      },
      {
        label: 'Popularity',
        fn: () => this.handleProductSorting('popularity')
      },
    ];

    return (
      <Fragment>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <SortMenus 
            anchorEl={anchorEl}
            handleShowSortMenu={this.handleShowSortMenu}
            handleCloseSortMenu={this.handleCloseSortMenu}
            sortTypes={sortTypes}
          />
          <ProductList
            isLoading={isLoading}
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
  isLoading: state.productsReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  onFetchProducts: () => dispatch(fetchProducts()),
  onProductAddedToCartById: (productId, history) => dispatch(addProductToCartById(productId, history)),
  onRestockProductById: (productId) => dispatch(restockProductById(productId)),
  onSortProducts: (sortBy) => dispatch(sortProducts(sortBy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));