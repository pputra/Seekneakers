import React from 'react';

import { CircularProgress} from '@material-ui/core';

const root = {
  display: 'flex', 
  justifyContent:'center', 
  alignItems:'center', 
  minHeight:'100px',
};

const WithLoading = Component => {
  return ({isLoading, ...props}) => {
    if (!isLoading) {
      return (
        <Component {...props} />
      );
    }
    return (
      <div style={root}>
          <CircularProgress 
            color="secondary"
            size={50}
            thickness={2}
          />
      </div>
    );
  }
}

export default WithLoading;