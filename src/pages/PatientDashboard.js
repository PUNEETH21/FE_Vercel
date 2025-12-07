import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axios';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [wellnessData, setWellnessData] = useState({
    steps: 3620,
    sleep: { start: '11:30 pm', end: '06:00 am', hours: 6 },
    activeTime: '30 mins',
    calories: 1712,
    distance: '1:23km',
  });
  const [reminders, setReminders] = useState([]);
  const [healthTip, setHealthTip] = useState('Stay hydrated! Aim to drink at least 8 glasses of water per day.');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [remindersRes] = await Promise.all([
        api.get('/api/preventive-care?status=scheduled'),
      ]);
      setReminders(remindersRes.data.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <Box sx={{ 
      py: { xs: 1, sm: 2 }, 
      px: { xs: 1, sm: 2, md: 3 }, 
      maxWidth: 1200, 
      mx: 'auto' 
    }}>
      {/* Welcome Section */}
      <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 600, 
          mb: 0.5, 
          fontSize: { xs: '1.5rem', sm: '1.75rem' } 
        }}>
          Welcome, {user?.name || 'Patient'}
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {/* Wellness Goals Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1.25rem' }}>
                Wellness Goals
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', py: 1.25 }}>
                        Steps
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #e2e8f0', py: 1.25, textAlign: 'right' }}>
                        {wellnessData.steps}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', py: 1.25 }}>
                        {wellnessData.steps} mints
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #e2e8f0', py: 1.25, textAlign: 'right' }}>
                        {wellnessData.sleep.start} - {wellnessData.sleep.end}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', py: 1.25 }}>
                        {wellnessData.sleep.hours} hrs
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #e2e8f0', py: 1.25, textAlign: 'right' }}>
                        {wellnessData.sleep.hours} hrs
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', py: 1.25 }}>
                        {wellnessData.activeTime}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #e2e8f0', py: 1.25, textAlign: 'right' }}>
                        {wellnessData.calories} Kcal
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, py: 1.25 }}>
                        {wellnessData.distance}
                      </TableCell>
                      <TableCell sx={{ py: 1.25, textAlign: 'right' }}>
                        {wellnessData.sleep.start} - {wellnessData.sleep.end}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Active Time Section */}
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1.25rem' }}>
                Active Time
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', py: 1.25 }}>
                        Steps
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #e2e8f0', py: 1.25, textAlign: 'right' }}>
                        {wellnessData.steps}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', py: 1.25 }}>
                        {wellnessData.steps} mints
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #e2e8f0', py: 1.25, textAlign: 'right' }}>
                        {wellnessData.sleep.start} - {wellnessData.sleep.end}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', py: 1.25 }}>
                        {wellnessData.sleep.hours} hrs
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #e2e8f0', py: 1.25, textAlign: 'right' }}>
                        {wellnessData.sleep.hours} hrs
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', py: 1.25 }}>
                        {wellnessData.activeTime}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #e2e8f0', py: 1.25, textAlign: 'right' }}>
                        {wellnessData.calories} Kcal
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, py: 1.25 }}>
                        {wellnessData.distance}
                      </TableCell>
                      <TableCell sx={{ py: 1.25, textAlign: 'right' }}>
                        {wellnessData.sleep.start} - {wellnessData.sleep.end}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          {/* Preventive Care Reminders */}
          <Card sx={{ mb: 2 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1.25rem' }}>
                Preventive Care Reminders
              </Typography>
              <Box>
                {reminders.length > 0 ? (
                  reminders.slice(0, 3).map((reminder, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Typography variant="body1">
                        • Upcoming: {reminder.title} on {new Date(reminder.scheduledDate).toLocaleDateString('en-US', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    • Upcoming: Annual blood test on 23rd Jan 2020
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Health Tip of the Day */}
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: '1.25rem' }}>
                Health Tip of the Day
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {healthTip}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;

