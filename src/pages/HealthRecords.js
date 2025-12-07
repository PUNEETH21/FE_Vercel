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

const HealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/api/health-records');
      setRecords(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch health records');
    } finally {
      setLoading(false);
    }
  };

  const getRecordTypeColor = (type) => {
    const colors = {
      'vital-signs': 'primary',
      'lab-result': 'success',
      'imaging': 'info',
      'vaccination': 'warning',
      'screening': 'secondary',
      'other': 'default',
    };
    return colors[type] || 'default';
  };

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
      <Box mb={2.5}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Health Records
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
          View and manage your medical records
        </Typography>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2, 
          overflowX: 'auto',
          '& .MuiTable-root': {
            minWidth: 600,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Recorded By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No health records found
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>
                    {format(new Date(record.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.recordType}
                      color={getRecordTypeColor(record.recordType)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{record.title}</TableCell>
                  <TableCell>{record.recordedBy?.name || 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HealthRecords;

