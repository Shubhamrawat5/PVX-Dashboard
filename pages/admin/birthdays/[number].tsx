import * as React from 'react';
import axios from 'axios';
import { utility } from '@lib';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { CreateUpdateFields } from '@components';

export const getServerSideProps: GetServerSideProps<{
  bday: Record<string, any>;
  updateUrl: string;
}> = async (context) => {
  const fullUrl = utility.apiPath(context.req, context.resolvedUrl);

  const getBday = async () => {
    try {
      const res = await fetch(fullUrl);
      const bday = await res.json();
      return bday;
    } catch (err) {
      return {};
    }
  };

  return { props: { bday: await getBday(), updateUrl: fullUrl } };
};

export default function Edit({ bday, updateUrl }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const handleSubmit = (body: Record<string, any>) => {
    return axios.put(updateUrl, body);
  };

  return <CreateUpdateFields data={bday} onSubmit={handleSubmit} type="birthday" />;
}
