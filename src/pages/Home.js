import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  LocalHospital,
  CalendarToday,
  HealthAndSafety,
  Assignment,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <LocalHospital fontSize="large" />,
      title: 'Patient Management',
      description: 'Comprehensive patient profiles and medical history tracking',
    },
    {
      icon: <CalendarToday fontSize="large" />,
      title: 'Appointment Scheduling',
      description: 'Easy appointment booking and management system',
    },
    {
      icon: <HealthAndSafety fontSize="large" />,
      title: 'Health Records',
      description: 'Secure storage and access to all health records',
    },
    {
      icon: <Assignment fontSize="large" />,
      title: 'Preventive Care',
      description: 'Track vaccinations, screenings, and wellness programs',
    },
  ];

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
          color: 'white',
          py: { xs: 4, md: 6 },
          textAlign: 'center',
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 1.5,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              px: { xs: 2, sm: 0 },
            }}
          >
            Healthcare Wellness & Preventive Care
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              opacity: 0.95,
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              px: { xs: 2, sm: 0 },
            }}
          >
            Your comprehensive healthcare management solution
          </Typography>
          {!isAuthenticated && (
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/register"
                sx={{ 
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 5,
                  py: 1.75,
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/login"
                sx={{ 
                  borderColor: 'white',
                  borderWidth: 2,
                  color: 'white',
                  px: 5,
                  py: 1.75,
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: 2,
                    bgcolor: 'rgba(255,255,255,0.15)',
                  },
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <Container sx={{ mb: 2, pb: 2 }}>
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ 
            mb: 0.5,
            color: 'text.primary',
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '2rem' },
            px: { xs: 2, sm: 0 },
          }}
        >
          Our Services
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mb: 2,
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            px: { xs: 2, sm: 0 },
          }}
        >
          Comprehensive healthcare management tools designed to keep you and your family healthy
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box 
                    sx={{ 
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'inline-flex',
                        fontSize: '2rem',
                      }}
                    >
                      {feature.icon}
                    </Box>
                  </Box>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

