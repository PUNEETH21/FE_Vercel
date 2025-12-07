import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Typography,
  Box,
  Link,
  MenuItem,
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
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
              Create Account
            </AuthTitle>
            <Typography variant="body2" color="text.secondary">
              Join us to manage your healthcare journey
            </Typography>
          </AuthHeaderBox>
          <Box component="form" onSubmit={handleSubmit}>
            <FormFieldWrapper>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                required
                size="small"
              />
            </FormFieldWrapper>
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
            <FormFieldWrapper>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                size="small"
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <TextField
                fullWidth
                select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                margin="normal"
                size="small"
              >
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
              </TextField>
            </FormFieldWrapper>
            <FormFieldWrapper>
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
            </FormFieldWrapper>
            <FormFieldWrapperLast>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
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
              Create Account
            </AuthButton>
            <Typography align="center" variant="body2" color="text.secondary">
              Already have an account?{' '}
              <AuthLinkButton 
                component="button" 
                variant="body2" 
                onClick={() => navigate('/login')}
              >
                Sign in here
              </AuthLinkButton>
            </Typography>
          </Box>
        </AuthPaper>
      </Container>
    </AuthPageContainer>
  );
};

export default Register;

