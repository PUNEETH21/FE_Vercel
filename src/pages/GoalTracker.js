import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import api from '../utils/axios';
import { toast } from 'react-toastify';

const GoalTracker = () => {
  const [goals, setGoals] = useState({
    steps: '',
    water: '',
    sleep: '',
    calories: '',
  });

  const handleChange = (field, value) => {
    setGoals({ ...goals, [field]: value });
  };

  const handleSubmit = async (field) => {
    try {
      // Here you would save to backend
      toast.success(`${field} logged successfully!`);
      setGoals({ ...goals, [field]: '' });
    } catch (error) {
      toast.error('Failed to log goal');
    }
  };

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: { xs: 2, sm: 2.5 }, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Goal Tracker
      </Typography>

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Daily Steps
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, sm: 2 } }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Steps"
                  value={goals.steps}
                  onChange={(e) => handleChange('steps', e.target.value)}
                  placeholder="Enter steps"
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={() => handleSubmit('Steps')}
                  sx={{ minWidth: { xs: '100%', sm: 120 } }}
                >
                  Log
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Water Intake
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, sm: 2 } }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Glasses"
                  value={goals.water}
                  onChange={(e) => handleChange('water', e.target.value)}
                  placeholder="Enter glasses"
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={() => handleSubmit('Water')}
                  sx={{ minWidth: { xs: '100%', sm: 120 } }}
                >
                  Log
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Sleep Hours
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, sm: 2 } }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Hours"
                  value={goals.sleep}
                  onChange={(e) => handleChange('sleep', e.target.value)}
                  placeholder="Enter hours"
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={() => handleSubmit('Sleep')}
                  sx={{ minWidth: { xs: '100%', sm: 120 } }}
                >
                  Log
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Calories Burned
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, sm: 2 } }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Calories"
                  value={goals.calories}
                  onChange={(e) => handleChange('calories', e.target.value)}
                  placeholder="Enter calories"
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={() => handleSubmit('Calories')}
                  sx={{ minWidth: { xs: '100%', sm: 120 } }}
                >
                  Log
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GoalTracker;

