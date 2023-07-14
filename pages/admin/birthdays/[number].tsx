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
import axios, { AxiosResponse } from 'axios';
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

export default function Edit({ bday, updateUrl }) {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(data.entries());
    axios
      .put(updateUrl, body)
      .then((res) => {
        router.back();
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%', padding: '5%' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {FIELDS.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <TextField
                      required
                      fullWidth
                      id={index.toString()}
                      label={item.label}
                      name={item.name}
                      type={item.type}
                      defaultValue={bday[item.name]}
                      disabled={item.disabled}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
