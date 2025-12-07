import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
} from '@mui/material';
import api from '../utils/axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const PreventiveCare = () => {
  const [preventiveCare, setPreventiveCare] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreventiveCare();
  }, []);

  const fetchPreventiveCare = async () => {
    try {
      const response = await api.get('/api/preventive-care');
      setPreventiveCare(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch preventive care records');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'info',
      completed: 'success',
      overdue: 'error',
      cancelled: 'default',
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'default',
      medium: 'warning',
      high: 'error',
    };
    return colors[priority] || 'default';
  };

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
      <Box mb={2.5}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Preventive Care
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Track your preventive care and wellness programs
        </Typography>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2, 
          overflowX: 'auto',
          '& .MuiTable-root': {
            minWidth: 700,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Scheduled Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {preventiveCare.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No preventive care records found
                </TableCell>
              </TableRow>
            ) : (
              preventiveCare.map((care) => (
                <TableRow key={care._id}>
                  <TableCell>{care.title}</TableCell>
                  <TableCell>{care.careType}</TableCell>
                  <TableCell>
                    {format(new Date(care.scheduledDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={care.status}
                      color={getStatusColor(care.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={care.priority}
                      color={getPriorityColor(care.priority)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PreventiveCare;

