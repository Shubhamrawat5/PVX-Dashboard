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
  },
];

const URL = 'http://localhost:3000/api/v1/admin/bdays';

export default function SignUp() {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(data.entries());
    axios
      .post(URL, body)
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
                      defaultValue={''}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Create
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
