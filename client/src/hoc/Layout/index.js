import React, { Fragment } from 'react';

import Navbar from '../../components/Navbar';
import Footer from  '../../components/Footer';

const Layout = props => (
  <Fragment>
    <Navbar />
      <main>
        {props.children}
      </main>
    <Footer />
  </Fragment>
);

export default Layout;