'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { utility } from '@lib';
import { GetServerSideProps } from 'next';

const defaultTheme = createTheme();

const FIELDS = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
  },
  {
    name: 'date',
    label: 'Date',
    type: 'number',
  },
  {
    name: 'month',
    label: 'Month',
    type: 'number',
  },
  {
    name: 'year',
    label: 'Year',
    type: 'number',
  },
  {
    name: 'place',
    label: 'Place',
    type: 'text',
  },
  {
    name: 'number',
    label: 'Number',
    type: 'number',
    disabled: true,
  },
];

const URL = 'http://localhost:3000/api/admin/birthdays';

export const getServerSideProps: GetServerSideProps<{
  serverData: string;
}> = async ({ req }) => {
  const fullUrl = utility.apiPath(req);
  console.log({ fullUrl });
  try {
    const res = await fetch(fullUrl);
    const serverData = await res.json();
    console.log({ serverData });
    return {
      props: {
        serverData,
      },
    };
  } catch (err) {
    console.log({ err });
    return {
      props: {
        serverData: [],
      },
    };
  }
};
const login = (props) => {
  console.log({ props });
  return <div>login</div>;
};

export default login;
