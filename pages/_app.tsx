import { useRouter } from 'next/router';
import '../styles/globals.css';
import React from 'react';
import { DashBoard } from '../components';

function MyApp({ Component, pageProps }) {
  const path = useRouter().pathname;

  const isAdmin = path.includes('/admin');
  if (isAdmin) {
    return <DashBoard {...{ Component, pageProps }} />;
  } else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
