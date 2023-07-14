import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { utility } from '@lib';

const defaultTheme = createTheme();

const FIELDS = {
  birthday: [
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
  ],
};

interface Props<T> {
  data?: T;
  onSubmit: (body: T) => Promise<any>;
  type: keyof typeof FIELDS;
}

const CreateUpdateFields = <T extends unknown>({ data = {} as T, onSubmit, type }: Props<T>) => {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(data.entries()) as T;
    onSubmit(body)
      .then((res) => {
        router.back();
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const btnTitle = React.useMemo(() => {
    let perfix = 'Create';
    if (Object.entries(data).length) {
      perfix = 'Update';
    }
    return `${perfix} ${utility.capitalize(type)}`;
  }, [data, type]);

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
                {FIELDS[type].map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <TextField
                      required
                      fullWidth
                      id={index.toString()}
                      label={item.label}
                      name={item.name}
                      type={item.type}
                      defaultValue={data[item.name]}
                      disabled={item.disabled && data[item.name]}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {btnTitle}
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default CreateUpdateFields;
