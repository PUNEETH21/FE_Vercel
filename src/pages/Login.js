import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import {
  AuthPageContainer,
  AuthPaper,
  AuthIconBox,
  AuthIconText,
  AuthHeaderBox,
  AuthTitle,
  AuthButton,
  FormFieldWrapper,
  FormFieldWrapperLast,
  AuthLinkButton,
} from '../styles/styledComponents';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthPageContainer>
      <Container maxWidth="sm">
        <AuthPaper elevation={0}>
          <AuthHeaderBox>
            <AuthIconBox>
              <AuthIconText variant="h3">🏥</AuthIconText>
            </AuthIconBox>
            <AuthTitle variant="h4">
              Welcome Back 12345678
            </AuthTitle>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your healthcare dashboard
            </Typography>
          </AuthHeaderBox>
          <Box component="form" onSubmit={handleSubmit}>
            <FormFieldWrapper>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                required
                size="small"
              />
            </FormFieldWrapper>
            <FormFieldWrapperLast>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                required
                size="small"
              />
            </FormFieldWrapperLast>
            <AuthButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              Sign In
            </AuthButton>
            <Typography align="center" variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <AuthLinkButton 
                component="button" 
                variant="body2" 
                onClick={() => navigate('/register')}
              >
                Create an account
              </AuthLinkButton>
            </Typography>
          </Box>
        </AuthPaper>
      </Container>
    </AuthPageContainer>
  );
};

export default Login;

