import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  CalendarToday,
  Assignment,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import api from '../utils/axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Reminders = () => {
  const [reminders, setReminders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await api.get('/api/reminders');
      setReminders(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch reminders');
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

  if (!reminders) {
    return <Typography>No reminders available</Typography>;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <CalendarToday color="primary" />;
      case 'preventive-care':
        return <Assignment color="warning" />;
      default:
        return <CheckCircle />;
    }
  };

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
      <Box mb={2.5}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Reminders & Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Stay on top of your appointments and preventive care
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mt: 1 }}>
        {/* Overdue Items */}
        {reminders.overdue && reminders.overdue.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ borderLeft: '4px solid', borderColor: 'error.main' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box display="flex" alignItems="center" mb={1.5}>
                  <Warning color="error" sx={{ mr: 1 }} />
                  <Typography variant="h6">Overdue Items</Typography>
                </Box>
                <List>
                  {reminders.overdue.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem>
                        <ListItemIcon>{getIcon(item.type)}</ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {format(new Date(item.date), 'MMM dd, yyyy')}
                              </Typography>
                              {item.description && ` - ${item.description}`}
                            </>
                          }
                        />
                        <Chip label="Overdue" color="error" size="small" />
                      </ListItem>
                      {index < reminders.overdue.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                Upcoming Appointments
              </Typography>
              {reminders.appointments.length === 0 ? (
                <Typography color="textSecondary">No upcoming appointments</Typography>
              ) : (
                <List>
                  {reminders.appointments.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem>
                        <ListItemIcon>{getIcon(item.type)}</ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {format(new Date(item.date), 'MMM dd, yyyy')} at {item.time}
                              </Typography>
                              {item.description && ` - ${item.description}`}
                            </>
                          }
                        />
                      </ListItem>
                      {index < reminders.appointments.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Preventive Care */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                Upcoming Preventive Care
              </Typography>
              {reminders.preventiveCare.length === 0 ? (
                <Typography color="textSecondary">No upcoming preventive care</Typography>
              ) : (
                <List>
                  {reminders.preventiveCare.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem>
                        <ListItemIcon>{getIcon(item.type)}</ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {format(new Date(item.date), 'MMM dd, yyyy')}
                              </Typography>
                              {item.description && ` - ${item.description}`}
                            </>
                          }
                        />
                        {item.priority && (
                          <Chip
                            label={item.priority}
                            color={item.priority === 'high' ? 'error' : item.priority === 'medium' ? 'warning' : 'default'}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </ListItem>
                      {index < reminders.preventiveCare.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reminders;

