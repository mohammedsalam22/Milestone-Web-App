import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import { Save as SaveIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ScheduleHeader = ({ 
  selectedGrade, 
  onSave, 
  onRefresh, 
  loading, 
  error, 
  onCloseError,
  hasChanges = false 
}) => {
  const theme = useTheme();

  if (!selectedGrade) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Schedule Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Please select a grade to manage its schedule
        </Typography>
      </Box>
    );
  }

  return (
         <Box sx={{ 
       p: 3, 
       borderBottom: `1px solid ${theme.palette.divider}`,
       backgroundColor: theme.palette.background.paper
     }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" sx={{ 
            color: theme.palette.text.primary,
            fontWeight: 600,
            mb: 1
          }}>
            {selectedGrade.name} Schedule
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                         <Chip
               label={selectedGrade.study_stage.name}
               size="small"
               variant="outlined"
               color="primary"
               sx={{
                 fontSize: '0.75rem',
                 height: 24,
               }}
             />
             <Chip
               label={selectedGrade.study_year.name}
               size="small"
               variant="outlined"
               color="secondary"
               sx={{
                 fontSize: '0.75rem',
                 height: 24,
               }}
             />
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
            disabled={loading}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              py: 1,
            }}
          >
            Refresh
          </Button>
                     <Button
             variant="contained"
             startIcon={<SaveIcon />}
             onClick={onSave}
             disabled={loading || !hasChanges}
             sx={{
               borderRadius: 2,
               textTransform: 'none',
               fontWeight: 500,
               px: 2,
               py: 1,
               boxShadow: theme.shadows[1],
               '&:hover': {
                 boxShadow: theme.shadows[2],
               },
             }}
           >
            Save Schedule
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={onCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={onCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ScheduleHeader; 