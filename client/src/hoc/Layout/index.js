import React, { Fragment } from 'react';

import Navbar from '../../components/Navbar';

const Layout = props => (
  <Fragment>
    <Navbar />
      <main style={{marginTop: '10px'}}>
        {props.children}
      </main>
  </Fragment>
);

export default Layout;