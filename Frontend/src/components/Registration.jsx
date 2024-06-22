import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
    Container, TextField, Button, Typography, Box, Alert, IconButton, InputAdornment, Grid, Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Registration = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('error');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const defaultTheme = createTheme();

    const validate = () => {
        const newErrors = {};
        if (!username || username.length < 2) newErrors.username = 'Name must be at least 2 characters long';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
                username,
                email,
                password,
            });
            console.log('Response:', response.data);
            setMessageType('success');
            setMessage('Registration successful!');
            // Redirect to login page after successful registration
                navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            setMessageType('error');
            if (error.response) {
                setMessage('Registration failed: ' + error.response.data.message);
            } else {
                setMessage('Registration failed: An unexpected error occurred.');
            }
        }
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        switch (field) {
            case 'name':
                setName(value);
                if (value.length >= 2) {
                    setErrors((prev) => ({ ...prev, name: null }));
                } else {
                    setErrors((prev) => ({ ...prev, name: 'Name must be at least 2 characters long' }));
                }
                break;
            case 'email':
                setEmail(value);
                if (/\S+@\S+\.\S+/.test(value)) {
                    setErrors((prev) => ({ ...prev, email: null }));
                } else {
                    setErrors((prev) => ({ ...prev, email: 'Email is invalid' }));
                }
                break;
            case 'password':
                setPassword(value);
                if (value.length >= 6) {
                    setErrors((prev) => ({ ...prev, password: null }));
                } else {
                    setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters long' }));
                }
                break;
            default:
                break;
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
<ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
            <Box
                component="form"
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
                noValidate
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={username}
                    onChange={(e) => handleInputChange(e, 'name')}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handleInputChange(e, 'password')}
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    fullWidth
                >
                    Sign Up
                </Button>
                {message && (
                    <Alert severity={messageType} sx={{ width: '100%', mt: 2 }}>
                        {message}
                    </Alert>
                )}
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/signin" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </ThemeProvider>

    );
};

export default Registration;
