import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
} from '@mui/material';
import {
  Search,
  FilterList,
} from '@mui/icons-material';
import { 
  setSearchTerm, 
  setSelectedResult, 
  setSelectedReligion, 
  clearFilters 
} from '../../../featuers/placement-tests-slice/placementTestsSlice';

const PlacementTestsHeader = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedResult, selectedReligion } = useSelector((state) => state.placementTests);

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleResultChange = (event) => {
    dispatch(setSelectedResult(event.target.value));
  };

  const handleReligionChange = (event) => {
    dispatch(setSelectedReligion(event.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const religions = ['christianity', 'islam', 'judaism', 'other'];
  const results = ['passed', 'failed', 'pending'];

  return (
    <>
      {/* Title and Filters in same row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Student Registration
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by student name..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ 
              minWidth: 250,
              '& .MuiOutlinedInput-root': { borderRadius: 2 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Test Result</InputLabel>
            <Select
              value={selectedResult}
              label="Test Result"
              onChange={handleResultChange}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="">All Results</MenuItem>
              {results.map((result) => (
                <MenuItem key={result} value={result}>
                  {result.charAt(0).toUpperCase() + result.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Religion</InputLabel>
            <Select
              value={selectedReligion}
              label="Religion"
              onChange={handleReligionChange}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="">All Religions</MenuItem>
              {religions.map((religion) => (
                <MenuItem key={religion} value={religion}>
                  {religion.charAt(0).toUpperCase() + religion.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {(searchTerm || selectedResult || selectedReligion) && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFilters}
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Clear Filters
            </Button>
          )}
        </Box>
      </Box>

      {/* Active Filters */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        {searchTerm && (
          <Chip
            label={`Search: ${searchTerm}`}
            onDelete={() => dispatch(setSearchTerm(''))}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
        {selectedResult && (
          <Chip
            label={`Result: ${selectedResult}`}
            onDelete={() => dispatch(setSelectedResult(''))}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
        {selectedReligion && (
          <Chip
            label={`Religion: ${selectedReligion}`}
            onDelete={() => dispatch(setSelectedReligion(''))}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Box>
    </>
  );
};

export default PlacementTestsHeader; 