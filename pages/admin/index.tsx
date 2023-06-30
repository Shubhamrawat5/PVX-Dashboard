import { LoginPage } from '@components';
import React from 'react';

const RootAdmin = () => {
  const isLoggedIn = false;

  return isLoggedIn ? <div>Admin Page</div> : <LoginPage />;
};

export default RootAdmin;
