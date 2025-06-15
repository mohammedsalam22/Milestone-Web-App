import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Reports = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh', // Ensure it takes up at least the full viewport height
    }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Reports
      </Typography>
      {/* You can add more student-related content here later */}
    </Box>
  );
};

export default Reports;