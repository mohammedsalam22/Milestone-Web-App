import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Alert, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fetchPlacementTests } from '../../featuers/placement-tests-slice/placementTestsSlice';
import PlacementTestsHeader from './components/PlacementTestsHeader';
import PlacementTestsTable from './components/PlacementTestsTable';

const PlacementTestsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { placementTests, loading, error } = useSelector((state) => state.placementTests);

  useEffect(() => {
    dispatch(fetchPlacementTests());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Registration
        </Typography>
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  return (
    <Box sx={{
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
          }}>
        {/* Header with Title and Filters */}
        <PlacementTestsHeader />

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Results Count */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {placementTests.length} student registrations
          </Typography>
        </Box>

      {/* Placement Tests Table */}
      <PlacementTestsTable placementTests={placementTests} />
    </Box>
  );
};

export default PlacementTestsPage; 