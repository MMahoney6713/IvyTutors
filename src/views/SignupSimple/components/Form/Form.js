/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your full name'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
});

const Form = ({ signup }) => {
  const history = useHistory();
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
  };

  const onSubmit = async (values) => {
    let result = await signup(values);
    if (result.success) {
      history.push('/dashboard');
    } else {
      return;
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        {/* <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'text.secondary'}
        >
          Signup
        </Typography> */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Create a student account.
        </Typography>
        {/* <Typography color="text.secondary">
          Fill out the form to get started.
        </Typography> */}
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 1 }}>
              Enter your full name
            </Typography>
            <TextField
              label="Full name *"
              variant="outlined"
              name={'fullName'}
              fullWidth
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 1 }}>
              Enter your email
            </Typography>
            <TextField
              label="Email *"
              variant="outlined"
              name={'email'}
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 1 }}>
              Enter your password
            </Typography>
            <TextField
              label="Password *"
              variant="outlined"
              name={'password'}
              type={'password'}
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Already have an account?{' '}
                  <Link
                    component={RouterLink}
                    color={'primary'}
                    to={'/signin'}
                    underline={'none'}
                  >
                    Login.
                  </Link>
                </Typography>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
                Sign up
              </Button>
            </Box>
          </Grid>
          {/* <Grid
            item
            container
            xs={12}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              variant={'subtitle2'}
              color={'text.secondary'}
              align={'center'}
            >
              By clicking "Sign up" button you agree with our{' '}
              <Link
                component={'a'}
                color={'primary'}
                href={'/company-terms'}
                underline={'none'}
              >
                company terms and conditions.
              </Link>
            </Typography>
          </Grid> */}
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
