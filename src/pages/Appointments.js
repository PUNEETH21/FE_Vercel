import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import api from '../utils/axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Appointments = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    type: 'consultation',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/api/appointments');
      setAppointments(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/appointments', formData);
      toast.success('Appointment created successfully');
      setOpen(false);
      setFormData({
        doctor: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
        type: 'consultation',
      });
      fetchAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create appointment');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'info',
      confirmed: 'success',
      completed: 'default',
      cancelled: 'error',
      'no-show': 'warning',
    };
    return colors[status] || 'default';
  };

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
      <Box 
        display="flex" 
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        mb={2.5}
        gap={2}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Appointments
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Manage your medical appointments
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: 'primary.main',
            fontWeight: 600,
            px: { xs: 2, sm: 3 },
            py: 1.25,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          New Appointment
        </Button>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2, 
          overflowX: 'auto',
          '& .MuiTable-root': {
            minWidth: 650,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>
                    {format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{appointment.appointmentTime}</TableCell>
                  <TableCell>
                    {appointment.doctor?.name || 'N/A'}
                  </TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={fullScreen}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Doctor ID"
              name="doctor"
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              margin="normal"
              required
              size="small"
            />
            <TextField
              fullWidth
              label="Date"
              name="appointmentDate"
              type="date"
              value={formData.appointmentDate}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
              size="small"
            />
            <TextField
              fullWidth
              label="Time"
              name="appointmentTime"
              type="time"
              value={formData.appointmentTime}
              onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
              size="small"
            />
            <TextField
              fullWidth
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              required
              size="small"
            />
            <TextField
              fullWidth
              select
              label="Type"
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              margin="normal"
              size="small"
            >
              <MenuItem value="consultation">Consultation</MenuItem>
              <MenuItem value="follow-up">Follow-up</MenuItem>
              <MenuItem value="checkup">Checkup</MenuItem>
              <MenuItem value="emergency">Emergency</MenuItem>
              <MenuItem value="preventive">Preventive</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Appointments;

