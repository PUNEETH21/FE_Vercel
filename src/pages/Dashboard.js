import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  CalendarToday,
  HealthAndSafety,
  Assignment,
  Person,
  TrendingUp,
  Notifications,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Button, CardActions } from '@mui/material';
import api from '../utils/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    appointments: 0,
    healthRecords: 0,
    preventiveCare: 0,
    loading: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [appointmentsRes, recordsRes, preventiveRes] = await Promise.all([
        api.get('/api/appointments'),
        api.get('/api/health-records'),
        api.get('/api/preventive-care'),
      ]);

      setStats({
        appointments: appointmentsRes.data.count || 0,
        healthRecords: recordsRes.data.count || 0,
        preventiveCare: preventiveRes.data.count || 0,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ ...stats, loading: false });
    }
  };

  const statCards = [
    {
      title: 'Appointments',
      value: stats.appointments,
      icon: <CalendarToday />,
      color: '#0d9488',
      bgGradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
      link: '/appointments',
    },
    {
      title: 'Health Records',
      value: stats.healthRecords,
      icon: <HealthAndSafety />,
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      link: '/health-records',
    },
    {
      title: 'Preventive Care',
      value: stats.preventiveCare,
      icon: <Assignment />,
      color: '#14b8a6',
      bgGradient: 'linear-gradient(135deg, #14b8a6 0%, #5eead4 100%)',
      link: '/preventive-care',
    },
    {
      title: 'Analytics',
      value: 'View',
      icon: <TrendingUp />,
      color: '#0d9488',
      bgGradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
      link: '/analytics',
    },
    {
      title: 'Reminders',
      value: 'View',
      icon: <Notifications />,
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      link: '/reminders',
    },
    {
      title: 'Patient Profile',
      value: 'View',
      icon: <Person />,
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      link: '/patient-profile',
    },
  ];

  if (stats.loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          mb: 0.5,
          color: 'text.primary',
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        Welcome to Your Dashboard
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ mb: { xs: 2, sm: 2.5 }, display: { xs: 'none', sm: 'block' } }}
      >
        Manage your healthcare information and appointments in one place
      </Typography>
      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
              }}
              component={Link}
              to={card.link}
            >
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                  p: 3,
                  color: 'white',
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.25)',
                      borderRadius: 2,
                      p: 1.5,
                      display: 'flex',
                      fontSize: '1.75rem',
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 0.5,
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                  }}
                >
                  {card.value}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    opacity: 0.95,
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                  }}
                >
                  {card.title}
                </Typography>
              </Box>
              <CardActions sx={{ p: 2, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button 
                  size="medium" 
                  component={Link} 
                  to={card.link}
                  sx={{ 
                    color: card.color,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: `${card.color}10`,
                    },
                  }}
                >
                  View Details →
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;

