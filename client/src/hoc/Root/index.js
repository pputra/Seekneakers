import React, { Fragment } from 'react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const  Root = props => (
  <Fragment>
        <Navbar />
          <main style={{marginTop: '100px', minHeight:'500px'}}>
            {props.children}
          </main>
        <Footer />
  </Fragment>
);

export default Root;