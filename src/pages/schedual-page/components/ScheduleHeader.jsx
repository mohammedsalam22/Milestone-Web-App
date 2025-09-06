import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  useTheme,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

const ScheduleHeader = ({ 
  selectedSection, 
  onRefresh, 
  loading, 
  error, 
  onCloseError
}) => {
  const theme = useTheme();
  if (!selectedSection) {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Schedule Management
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please select a section to manage its schedule
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 2, 
      borderBottom: 1, 
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.paper
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Section {selectedSection.name} Schedule
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {selectedSection.grade?.study_stage?.name} - {selectedSection.grade?.name}
          </Typography>
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          disabled={loading}
          sx={{ borderRadius: 2 }}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" onClose={onCloseError} sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ScheduleHeader; 