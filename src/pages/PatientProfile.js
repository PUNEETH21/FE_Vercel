import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import api from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const PatientProfile = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchPatientProfile();
  }, []);

  const fetchPatientProfile = async () => {
    try {
      const response = await api.get('/api/patients/me');
      setPatient(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch patient profile');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setFormData(item || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
    setDialogType(null);
  };

  const handleSubmit = async () => {
    try {
      if (dialogType === 'medicalHistory') {
        const medicalHistory = patient.medicalHistory || [];
        const newItem = {
          condition: formData.condition,
          diagnosisDate: formData.diagnosisDate,
          status: formData.status || 'active',
          notes: formData.notes
        };
        
        if (formData._id) {
          // Update
          const updated = medicalHistory.map(item =>
            item._id === formData._id ? { ...item, ...newItem } : item
          );
          await api.put(`/api/patients/${patient._id}`, {
            medicalHistory: updated
          });
        } else {
          // Add
          await api.put(`/api/patients/${patient._id}`, {
            medicalHistory: [...medicalHistory, newItem]
          });
        }
      } else if (dialogType === 'allergy') {
        const allergies = patient.allergies || [];
        const newItem = {
          allergen: formData.allergen,
          severity: formData.severity || 'mild',
          notes: formData.notes
        };
        
        if (formData._id) {
          const updated = allergies.map(item =>
            item._id === formData._id ? { ...item, ...newItem } : item
          );
          await api.put(`/api/patients/${patient._id}`, {
            allergies: updated
          });
        } else {
          await api.put(`/api/patients/${patient._id}`, {
            allergies: [...allergies, newItem]
          });
        }
      } else if (dialogType === 'profile') {
        await api.put(`/api/patients/${patient._id}`, formData);
      }

      toast.success('Updated successfully');
      handleCloseDialog();
      fetchPatientProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!patient) {
    return <Typography>Patient profile not found</Typography>;
  }

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Patient Profile
      </Typography>

      <Paper elevation={3} sx={{ mt: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Profile" />
          <Tab label="Medical History" />
          <Tab label="Allergies" />
          <Tab label="Medications" />
        </Tabs>

        {/* Profile Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 2.5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Blood Group"
                  value={patient.bloodGroup || ''}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  select
                  size="small"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  value={patient.height?.value || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    height: { value: e.target.value, unit: 'cm' }
                  })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={patient.weight?.value || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    weight: { value: e.target.value, unit: 'kg' }
                  })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => handleOpenDialog('profile', patient)}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Medical History Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 2.5 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Medical History</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('medicalHistory')}
              >
                Add Condition
              </Button>
            </Box>
            <List>
              {(patient.medicalHistory || []).map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.condition}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {item.diagnosisDate && format(new Date(item.diagnosisDate), 'MMM dd, yyyy')}
                        </Typography>
                        <Chip label={item.status} size="small" sx={{ ml: 1 }} />
                        {item.notes && ` - ${item.notes}`}
                      </>
                    }
                  />
                  <IconButton onClick={() => handleOpenDialog('medicalHistory', item)}>
                    <EditIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Allergies Tab */}
        {tabValue === 2 && (
          <Box sx={{ p: 2.5 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Allergies</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('allergy')}
              >
                Add Allergy
              </Button>
            </Box>
            <List>
              {(patient.allergies || []).map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.allergen}
                    secondary={
                      <>
                        <Chip label={item.severity} size="small" />
                        {item.notes && ` - ${item.notes}`}
                      </>
                    }
                  />
                  <IconButton onClick={() => handleOpenDialog('allergy', item)}>
                    <EditIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Medications Tab */}
        {tabValue === 3 && (
          <Box sx={{ p: 2.5 }}>
            <Typography variant="h6" gutterBottom>Current Medications</Typography>
            <List>
              {(patient.medications || []).map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.dosage} - ${item.frequency}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>

      {/* Dialog for adding/editing */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth fullScreen={fullScreen}>
        <DialogTitle>
          {dialogType === 'medicalHistory' && 'Add/Edit Medical Condition'}
          {dialogType === 'allergy' && 'Add/Edit Allergy'}
          {dialogType === 'profile' && 'Update Profile'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'medicalHistory' && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Condition"
                  value={formData.condition || ''}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Diagnosis Date"
                  type="date"
                  value={formData.diagnosisDate ? format(new Date(formData.diagnosisDate), 'yyyy-MM-dd') : ''}
                  onChange={(e) => setFormData({ ...formData, diagnosisDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={formData.status || 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  size="small"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="chronic">Chronic</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  size="small"
                />
              </Grid>
            </Grid>
          )}
          {dialogType === 'allergy' && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Allergen"
                  value={formData.allergen || ''}
                  onChange={(e) => setFormData({ ...formData, allergen: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Severity"
                  value={formData.severity || 'mild'}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  size="small"
                >
                  <MenuItem value="mild">Mild</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="severe">Severe</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  size="small"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientProfile;

