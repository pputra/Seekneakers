import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  fetchCategories, 
  fetchProductsByCategory, 
  fetchProductsByKeywords, 
  selectFilteredProducts, 
} from '../../store/actions/product';
import { fetchCart } from '../../store/actions/cart';
import { logOut,getUserInfo } from '../../store/actions/auth';

import SideDrawer from './SideDrawer';
import SearchResults from './SearchResults';
import styles from './styles';
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CartIcon from '@material-ui/icons/ShoppingCart'
import MoreIcon from '@material-ui/icons/MoreVert';

class Navbar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    openDrawer: false,
  };

  componentDidMount() {
    const { 
      onFetchCategories, 
      onFetchCart, 
      onGetUserInfo 
    } = this.props;
    
    onFetchCategories();
    onFetchCart();
    onGetUserInfo();
  }

  toggleDrawer = isOpen => {
    this.setState({
      openDrawer: isOpen,
    });
  };

  handleJoinMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { 
      anchorEl, 
      mobileMoreAnchorEl, 
      openDrawer,
    } = this.state;
    const { 
      classes,
      firstName,
      categories, 
      onFetchProductsByCategory,
      onFetchProductsByKeywords,
      filteredProducts,
      onSelectFilteredProducts,
      onUserLogOut,
    } = this.props;
    const token = localStorage.getItem('token');
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClick={this.handleMenuClose}
      >
        <MenuItem>
          <Link to="/login" style={{ textDecoration: 'none', color:'black' }}>
            Login
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register" style={{ textDecoration: 'none', color:'black' }}>
            Register
          </Link>
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={this.props.cartTotalQuantity} color="secondary">
              <CartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
        <MenuItem onClick={this.handleJoinMenuOpen}>
          <IconButton color="inherit">
            <Typography>
              Join Now
            </Typography>
          </IconButton>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.navBar}>
          <Toolbar>
            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Open drawer"
              onClick={() => this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h2" color="inherit" noWrap>
              <Link to="/" style={{ textDecoration: 'none', color:'black' }}>
                Seekneakers
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={({target: {value}}) => onFetchProductsByKeywords(value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
              <SearchResults 
                filteredProducts={filteredProducts}
                onClick={onSelectFilteredProducts}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Link to="/cart" style={{ textDecoration: 'none', color:'black' }}>
                  <Badge 
                    badgeContent={this.props.cartTotalQuantity} 
                    color="secondary"
                  >
                    <CartIcon />
                  </Badge>
                </Link>
              </IconButton>
              {!token ?
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleJoinMenuOpen}
                  color="inherit"
                >
                  <Typography variant="h6">
                    Join Now
                  </Typography>
                </IconButton> :
                <IconButton disabled>
                  <Avatar style={{backgroundColor:'black'}}>
                    {firstName && firstName[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              }
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        <SideDrawer
          openDrawer={openDrawer}
          toggleDrawer={this.toggleDrawer}
          categories={categories}
          handleSelectedCategory={onFetchProductsByCategory}
          handleLogOut={onUserLogOut}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  firstName: state.userLoginReducer.firstName,
  categories: state.productsReducer.categories,
  productsInCart: state.cartReducer.products,
  cartTotalPrice: state.cartReducer.totalPrice,
  cartTotalQuantity: state.cartReducer.totalQuantity,
  filteredProducts: state.productsReducer.filteredProducts,
});

const mapDispatchToProps = dispatch => ({
  onFetchCategories: () => dispatch(fetchCategories()),
  onFetchProductsByCategory: (categoryId) => dispatch(fetchProductsByCategory(categoryId)),
  onFetchCart: () => dispatch(fetchCart()),
  onFetchProductsByKeywords: (keywords) => dispatch(fetchProductsByKeywords(keywords)),
  onSelectFilteredProducts: (productId) => dispatch((selectFilteredProducts(productId))),
  onGetUserInfo: () => dispatch(getUserInfo()),
  onUserLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));