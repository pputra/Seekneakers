import React, { Fragment } from 'react';

import Navbar from '../../components/Navbar';

const Layout = props => (
  <Fragment>
    <Navbar />
      <main>
        {props.children}
      </main>
  </Fragment>
);

export default Layout;