import React from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const SideDrawer = props => {
  const { classes } = props;
  return (
    <div className={classes.list}>
        <List>
          <ListItem button>
            <ListItemText primary={'Shop By Category'}/>
          </ListItem>
          {props.categories.map((category, id) => (
            <ListItem button key={id}>
              <ListItemText secondary={category}/>
            </ListItem>
          ))}
          <Divider/>
          <ListItem button>
            <ListItemText primary={'Cart'}/>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText primary={'Order History'}/>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText primary={'Account'}/>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText primary={'My Reviews'}/>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText primary={'Sign Out'}/>
          </ListItem>
          <Divider/>
        </List>
      </div>
  );
};

export default withStyles(styles)(SideDrawer);