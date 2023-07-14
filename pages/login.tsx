import { utility } from '@lib';
import { GetServerSideProps } from 'next';
import React from 'react';

export const getServerSideProps: GetServerSideProps<{
  serverData: string;
}> = async ({ req }) => {
  const fullUrl = utility.apiPath(req);
  const res = await fetch(fullUrl);
  const serverData = await res.json();

  return {
    props: {
      serverData,
    },
  };
};
const login = (props) => {
  console.log({ props });
  return <div>login</div>;
};

export default login;
