import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  CalendarToday,
  HealthAndSafety,
  Assignment,
  Warning,
} from '@mui/icons-material';
import api from '../utils/axios';
import { toast } from 'react-toastify';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/api/analytics/dashboard');
      setAnalytics(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!analytics) {
    return <Typography>No analytics data available</Typography>;
  }

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
      <Box mb={2.5}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Analytics & Insights
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
          View your healthcare statistics and trends
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mt: 1 }}>
        {/* Appointments Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Box display="flex" alignItems="center" mb={1.5}>
                <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Appointments</Typography>
              </Box>
              <Typography variant="h3" sx={{ mb: 0.5, fontSize: { xs: '1.75rem', sm: '2.5rem' } }}>{analytics.appointments.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming: {analytics.appointments.upcoming} | Completed: {analytics.appointments.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Records Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Box display="flex" alignItems="center" mb={1.5}>
                <HealthAndSafety sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Health Records</Typography>
              </Box>
              <Typography variant="h3" sx={{ mb: 0.5, fontSize: { xs: '1.75rem', sm: '2.5rem' } }}>{analytics.healthRecords.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                Recent (30 days): {analytics.healthRecords.recent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Preventive Care Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Box display="flex" alignItems="center" mb={1.5}>
                <Assignment sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h6">Preventive Care</Typography>
              </Box>
              <Typography variant="h3" sx={{ mb: 0.5, fontSize: { xs: '1.75rem', sm: '2.5rem' } }}>{analytics.preventiveCare.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                Completed: {analytics.preventiveCare.completed}
                {analytics.preventiveCare.overdue > 0 && (
                  <Box component="span" sx={{ color: 'error.main', ml: 1 }}>
                    | Overdue: {analytics.preventiveCare.overdue}
                  </Box>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments by Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                Appointments by Status
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analytics.appointments.byStatus.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item._id}</TableCell>
                        <TableCell align="right">{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Records by Type */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                Health Records by Type
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analytics.healthRecords.byType.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item._id}</TableCell>
                        <TableCell align="right">{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;

