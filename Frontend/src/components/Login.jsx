import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  Grid,
  Link,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMessage('');
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        { email, password }
      );

      console.log('Response:', response.data);

      if (response.data.token) {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        // Save token and user data to local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(decoded));
        localStorage.setItem('role', decoded.role);
        setMessage('Login successful!');

        decoded.role === 'admin'
          ? navigate('/AdminDashboard/')
          : navigate('/StudentDashboard/');
      } else {
        setMessage('Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.response?.data?.message || 'Login failed!');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <TextField
            label='Email'
            variant='outlined'
            margin='normal'
            fullWidth
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: '' });
            }}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
          />
          <TextField
            label='Password'
            variant='outlined'
            margin='normal'
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: '' });
            }}
            error={Boolean(errors.password)}
            helperText={errors.password}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Login
          </Button>
          {message && (
            <Alert severity='error' sx={{ width: '100%', mt: 2 }}>
              {message}
            </Alert>
          )}
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
