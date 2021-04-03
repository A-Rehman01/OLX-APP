import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '200px 0' }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loader;
