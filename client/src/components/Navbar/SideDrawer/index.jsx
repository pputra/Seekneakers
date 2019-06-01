import React from 'react';

import Menus from "./Menus";

import Drawer from '@material-ui/core/Drawer';

const SideDrawer = props => {
  const { 
    openDrawer, 
    toggleDrawer, 
    categories, 
    handleSelectedCategory,
    handleLogOut, 
  } = props;
  return (
    <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
      <div
        tabIndex={0}
        role="button"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        <Menus
          categories={categories}
          handleSelectedCategory={handleSelectedCategory}
          handleLogOut={handleLogOut}
        />
      </div>
    </Drawer>
  );
};

export default SideDrawer