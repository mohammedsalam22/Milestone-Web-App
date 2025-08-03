import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import {
  Person,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const PersonalInformation = ({
  formData,
  handleInputChange,
  activeStep,
  handleBack,
  handleNext,
  isStepValid,
}) => {
  const theme = useTheme();

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
            <Person />
            Personal Information
          </Typography>
          
          {/* Row 1: National No and Father Name */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <TextField
                fullWidth
                label="National Number"
                value={formData.national_no}
                onChange={(e) => handleInputChange('national_no', e.target.value)}
                required
                helperText="13 digits national ID"
                error={formData.national_no && formData.national_no.length !== 13}
                inputProps={{ maxLength: 13 }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    fontSize: '16px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Father Name"
                value={formData.father_name}
                onChange={(e) => handleInputChange('father_name', e.target.value)}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    fontSize: '16px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Mother Name"
                value={formData.mother_name}
                onChange={(e) => handleInputChange('mother_name', e.target.value)}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    fontSize: '16px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    fontSize: '16px'
                  }
                }}
              />
            </Box>
          </Box>

          {/* Row 2: Gender, Birth Date, Family Status */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  label="Gender"
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  sx={{ 
                    height: 56,
                    fontSize: '16px'
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Birth Date"
                type="date"
                value={formData.birth_date}
                onChange={(e) => handleInputChange('birth_date', e.target.value)}
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
              <FormControl fullWidth required>
                <InputLabel>Family Status</InputLabel>
                <Select
                  value={formData.family_status}
                  label="Family Status"
                  onChange={(e) => handleInputChange('family_status', e.target.value)}
                  sx={{ 
                    height: 56,
                    fontSize: '16px'
                  }}
                >
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="divorced">Divorced</MenuItem>
                  <MenuItem value="widowed">Widowed</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Row 3: Address */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
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
              onClick={handleNext}
              disabled={!isStepValid(activeStep)}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInformation; 