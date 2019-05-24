import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, fetchProductsByCategory } from '../../store/actions/product';
import { fetchCart } from '../../store/actions/cart';

import SideDrawer from './SideDrawer';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
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
    const { onFetchCategories, onFetchCart } = this.props
    onFetchCategories();
    onFetchCart();
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
    const { anchorEl, mobileMoreAnchorEl, openDrawer } = this.state;
    const { classes, categories, onFetchProductsByCategory } = this.props;
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
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
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
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleJoinMenuOpen}
                color="inherit"
              >
                <Typography variant="h6">
                  Join Now
                </Typography>
              </IconButton>
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.productsReducer.categories,
  productsInCart: state.cartReducer.products,
  cartTotalPrice: state.cartReducer.totalPrice,
  cartTotalQuantity: state.cartReducer.totalQuantity,
});

const mapDispatchToProps = dispatch => ({
  onFetchCategories: () => dispatch(fetchCategories()),
  onFetchProductsByCategory: (categoryId) => dispatch(fetchProductsByCategory(categoryId)),
  onFetchCart: () => dispatch(fetchCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));