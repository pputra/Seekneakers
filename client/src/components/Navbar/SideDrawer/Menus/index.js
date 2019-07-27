import React, { Fragment } from 'react';

import history from '../../../../history';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const Menus = props => {
  const { 
    classes, 
    categories, 
    handleSelectedCategory,
    handleLogOut,
  } = props;
  const token = localStorage.getItem('token');
  return (
    <div className={classes.list}>
        <List>
          <ListItem>
            <ListItemText primary={'Shop By Category'}/>
          </ListItem>
          {categories.map(({name, _id}) => (
            <ListItem button key={_id}>
              <ListItemText 
                secondary={name} 
                onClick={() => handleSelectedCategory(_id)}
              />
            </ListItem>
          ))}
          <Divider/>
          <ListItem button>
            <ListItemText 
              primary={'Cart'}
              onClick={() => history.push('cart')}
            />
          </ListItem>
          <ListItem button>
          <ListItemText 
            primary={'Checkout'}
            onClick={() => history.push('/checkout')}
          />
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText 
              primary={'Order History'} 
              onClick={() => history.push('/order')}
            />
          </ListItem>
          <Divider/>
          {token &&
          <Fragment>
            <ListItem button>
              <ListItemText 
                primary={'Sign Out'}
                onClick={handleLogOut}
              />
            </ListItem>
            <Divider />
          </Fragment>
          }
        </List>
      </div>
  );
};

export default withStyles(styles)(Menus);