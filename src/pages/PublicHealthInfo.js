import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';

const PublicHealthInfo = () => {
  const healthTopics = [
    {
      title: 'COVID-19 Updates',
      description: 'Stay informed about the latest COVID-19 guidelines and vaccination information.',
      link: '#',
    },
    {
      title: 'Seasonal Flu Prevention',
      description: 'Learn about steps you can take to prevent the seasonal flu and when to get vaccinated.',
      link: '#',
    },
    {
      title: 'Mental Health Awareness',
      description: 'Explore resources and support options for maintaining good mental health.',
      link: '#',
    },
  ];

  return (
    <Box sx={{ py: { xs: 1, sm: 1 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        {/* Navigation */}
        <Box sx={{ 
          mb: { xs: 1.5, sm: 2 }, 
          display: 'flex', 
          gap: { xs: 1, sm: 2 }, 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          <Button component={Link} to="/" sx={{ color: 'text.primary', fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Home
          </Button>
          <Button sx={{ color: 'text.primary', fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Health Topics
          </Button>
          <Button sx={{ color: 'text.primary', fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Services
          </Button>
          <Button sx={{ color: 'text.primary', fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Contact
          </Button>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 1.5, sm: 2 } }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
            Healthcare Portal
          </Typography>
        </Box>

        {/* Latest Health Information */}
        <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: { xs: 1.5, sm: 2 }, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Latest Health Information
          </Typography>

          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {healthTopics.map((topic, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5 }}>
                      {topic.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {topic.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: 'primary.main',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 2, textAlign: 'center', pt: 2, pb: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            HCLTech | Supercharging Progress™
          </Typography>
          <Typography variant="body2" color="text.secondary">
            hcltech.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PublicHealthInfo;

