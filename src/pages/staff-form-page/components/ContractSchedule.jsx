import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Schedule,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ContractSchedule = ({
  formData,
  handleInputChange,
  activeStep,
  handleBack,
  handleNext,
  isStepValid,
  loading,
  setShowConfirmDialog,
  isEditing,
  steps,
}) => {
  const theme = useTheme();

  const handleSubmit = () => {
    setShowConfirmDialog(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        mb: 4, 
        boxShadow: theme.shadows[2],
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper
      }}>
        <Box sx={{ p: 4 }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              mb: 4,
              color: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            <Schedule />
            Contract & Schedule
          </Typography>
          
                     {/* Row 1: Contract Start Date */}
           <Box sx={{ mb: 3 }}>
             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-between' }}>
               <TextField
                 fullWidth
                 label="Contract Start Date"
                 type="date"
                 value={formData.contract_start}
                 onChange={(e) => handleInputChange('contract_start', e.target.value)}
                 required
                 InputLabelProps={{
                   shrink: true,
                 }}
                 sx={{ 
                   '& .MuiOutlinedInput-root': {
                     height: 56,
                     fontSize: '16px'
                   }
                 }}
               />
             </Box>
           </Box>

           {/* Row 2: Contract End Date */}
           <Box sx={{ mb: 3 }}>
             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-between' }}>
               <TextField
                 fullWidth
                 label="Contract End Date"
                 type="date"
                 value={formData.contract_end}
                 onChange={(e) => handleInputChange('contract_end', e.target.value)}
                 required
                 InputLabelProps={{
                   shrink: true,
                 }}
                 sx={{ 
                   '& .MuiOutlinedInput-root': {
                     height: 56,
                     fontSize: '16px'
                   }
                 }}
               />
             </Box>
           </Box>

           {/* Row 3: Work Start Time */}
           <Box sx={{ mb: 3 }}>
             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-between' }}>
               <TextField
                 fullWidth
                 label="Work Start Time"
                 type="time"
                 value={formData.day_start}
                 onChange={(e) => handleInputChange('day_start', e.target.value)}
                 required
                 InputLabelProps={{
                   shrink: true,
                 }}
                 sx={{ 
                   '& .MuiOutlinedInput-root': {
                     height: 56,
                     fontSize: '16px'
                   }
                 }}
               />
             </Box>
           </Box>

           {/* Row 4: Work End Time */}
           <Box sx={{ mb: 3 }}>
             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-between' }}>
               <TextField
                 fullWidth
                 label="Work End Time"
                 type="time"
                 value={formData.day_end}
                 onChange={(e) => handleInputChange('day_end', e.target.value)}
                 required
                 InputLabelProps={{
                   shrink: true,
                 }}
                 sx={{ 
                   '& .MuiOutlinedInput-root': {
                     height: 56,
                     fontSize: '16px'
                   }
                 }}
               />
             </Box>
           </Box>

          {/* Navigation Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`
          }}>
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '16px'
              }}
            >
              Back
            </Button>
            
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!isStepValid(activeStep) || loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              {loading ? 'Processing...' : (isEditing ? 'Update Staff Member' : 'Create Staff Member')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContractSchedule; 