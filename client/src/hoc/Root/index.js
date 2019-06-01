import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';
import { getUserInfo } from '../../store/actions/auth';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

class Root extends Component {
  componentDidMount() {
    const { onGetUserInfo } = this.props;
    onGetUserInfo();
  }

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <Navbar />
          <main style={{marginTop: '100px', minHeight:'500px'}}>
            {children}
          </main>
        <Footer />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onGetUserInfo: () => dispatch(getUserInfo()),
});

export default connect(null, mapDispatchToProps)(Root);