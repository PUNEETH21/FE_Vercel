import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    if (searchQuery.length < 2) {
      setResults(null);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get('/api/search', {
        params: { q: searchQuery }
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleItemClick = (type, id) => {
    setQuery('');
    setResults(null);
    const routes = {
      appointments: '/appointments',
      healthRecords: '/health-records',
      preventiveCare: '/preventive-care',
      users: '/users'
    };
    if (routes[type]) {
      navigate(routes[type]);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 400 }}>
      <TextField
        fullWidth
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {results && query && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            maxHeight: 400,
            overflow: 'auto',
          }}
        >
          <List>
            {results.appointments.length > 0 && (
              <>
                <ListItem>
                  <Typography variant="subtitle2" color="primary">
                    Appointments ({results.appointments.length})
                  </Typography>
                </ListItem>
                {results.appointments.map((item) => (
                  <ListItem
                    key={item._id}
                    button
                    onClick={() => handleItemClick('appointments', item._id)}
                  >
                    <ListItemText
                      primary={item.reason}
                      secondary={`${item.appointmentDate} - ${item.patient?.name || item.doctor?.name}`}
                    />
                  </ListItem>
                ))}
              </>
            )}
            {results.healthRecords.length > 0 && (
              <>
                <ListItem>
                  <Typography variant="subtitle2" color="primary">
                    Health Records ({results.healthRecords.length})
                  </Typography>
                </ListItem>
                {results.healthRecords.map((item) => (
                  <ListItem
                    key={item._id}
                    button
                    onClick={() => handleItemClick('healthRecords', item._id)}
                  >
                    <ListItemText
                      primary={item.title}
                      secondary={item.recordType}
                    />
                  </ListItem>
                ))}
              </>
            )}
            {results.preventiveCare.length > 0 && (
              <>
                <ListItem>
                  <Typography variant="subtitle2" color="primary">
                    Preventive Care ({results.preventiveCare.length})
                  </Typography>
                </ListItem>
                {results.preventiveCare.map((item) => (
                  <ListItem
                    key={item._id}
                    button
                    onClick={() => handleItemClick('preventiveCare', item._id)}
                  >
                    <ListItemText
                      primary={item.title}
                      secondary={item.careType}
                    />
                  </ListItem>
                ))}
              </>
            )}
            {results.appointments.length === 0 &&
              results.healthRecords.length === 0 &&
              results.preventiveCare.length === 0 && (
                <ListItem>
                  <ListItemText primary="No results found" />
                </ListItem>
              )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;

