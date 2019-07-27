import React, { Fragment } from 'react';

import styles from './styles';
import { 
  withStyles,
  Grow,
  Paper,
  Popper,
  MenuList,
  Divider,
  MenuItem,
  Typography,
} from '@material-ui/core';

const SearchResults = props => {
  const {
    classes,
    filteredProducts,
    onClick,
  } = props;
  const open = !!filteredProducts.length > 0;

  return (
    <Popper open={open} anchorEl={false} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' , marginTop: '10%', width:'100%'}}
        >
          <Paper square>
            <MenuList>
              {filteredProducts.map((product, i) => (
                <Fragment>
                  <MenuItem 
                    onClick={() => onClick(product._id)} 
                    className={classes.MenuItem}
                  >
                    <img
                      alt={product.name}
                      height="50px"
                      width="55px"
                      src={product.image_src}
                    />
                    <div className={classes.productName}>
                      <Typography>
                        {product.name}
                      </Typography>
                    </div>
                  </MenuItem>
                  {i !== filteredProducts.length - 1 && <Divider />}
                </Fragment>
                ))}
            </MenuList>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

export default withStyles(styles)(SearchResults);