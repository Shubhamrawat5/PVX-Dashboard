import * as React from 'react';
import axios from 'axios';
import { utility } from '@lib';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { CreateUpdateFields } from '@components';

export const getServerSideProps: GetServerSideProps<{
  fullUrl: string;
}> = async (context) => {
  const fullUrl = utility.apiPath(context.req, context.resolvedUrl);
  return { props: { fullUrl } };
};

export default function Create({ fullUrl }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const handleSubmit = (body: Record<string, any>) => {
    return axios.post(fullUrl, body);
  };

  return <CreateUpdateFields onSubmit={handleSubmit} type="birthday" />;
}
