import React from 'react';

import styles from './styles';
import {  
  withStyles,
  Grid,
  Button,
  MenuItem,
  Typography,
  Menu,
} from '@material-ui/core';

const SortMenus = props => {
  const {
    classes,
    anchorEl,
    handleShowSortMenu,
    handleCloseSortMenu,
    sortTypes,
  } = props;
  return (
    <Grid  className={classes.filterMenu} container spacing={16} justify="flex-start">
      <Grid item>
        <Button 
          variant="outlined" 
          color="default"
          onClick={handleShowSortMenu}
        >
          <Typography>
            Sort By
          </Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseSortMenu}
        >
          {sortTypes.map((type) => (
            <MenuItem
              onClick={type.fn}
            >
              <Typography>{type.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SortMenus);