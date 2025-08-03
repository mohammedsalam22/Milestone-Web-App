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
  FamilyRestroom,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ParentInformation = ({
  parentNumber,
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
  const parentData = formData[`parent${parentNumber}_card`];
  const parentJob = formData[`parent${parentNumber}_job`];

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
            <FamilyRestroom />
            Parent {parentNumber} Information
          </Typography>
          
          {/* Row 1: Job, First Name, Last Name, Phone Number */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <TextField
                fullWidth
                label="Job"
                value={parentJob}
                onChange={(e) => handleInputChange(`parent${parentNumber}_job`, e.target.value)}
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
                label="First Name"
                value={parentData.first_name}
                onChange={(e) => handleInputChange(`parent${parentNumber}_card.first_name`, e.target.value)}
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
                label="Last Name"
                value={parentData.last_name}
                onChange={(e) => handleInputChange(`parent${parentNumber}_card.last_name`, e.target.value)}
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
                label="Phone Number"
                value={parentData.phone}
                onChange={(e) => handleInputChange(`parent${parentNumber}_card.phone`, e.target.value)}
                required
                error={parentData.phone && !/^09\d{8}$/.test(parentData.phone)}
                helperText={parentData.phone && !/^09\d{8}$/.test(parentData.phone) ? 
                  "Phone number must start with 09 and be 10 digits" : "Format: 0912345678"}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    fontSize: '16px'
                  }
                }}
              />
            </Box>
          </Box>
          
          {/* Row 2: Nationality, National Number, Place of Register, Birth City */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <TextField
                fullWidth
                label="Nationality"
                value={parentData.nationality}
                onChange={(e) => handleInputChange(`parent${parentNumber}_card.nationality`, e.target.value)}
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
                label="National Number"
                value={parentData.national_no}
                onChange={(e) => handleInputChange(`parent${parentNumber}_card.national_no`, e.target.value)}
                required
                error={parentData.national_no && parentData.national_no.length !== 13}
                helperText={parentData.national_no && parentData.national_no.length !== 13 ? 
                  "National number must be exactly 13 digits" : "13 digits national ID"}
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
                label="Place of Register"
                value={parentData.place_of_register}
                onChange={(e) => handleInputChange(`parent${parentNumber}_card.place_of_register`, e.target.value)}
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
                label="Birth City"
                value={parentData.birth_city}
                onChange={(e) => handleInputChange(`parent${parentNumber}_card.birth_city`, e.target.value)}
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
          
          {/* Row 3: Gender, Birth Date, Address */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <FormControl fullWidth required sx={{ 
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  fontSize: '16px'
                }
              }}>
                <InputLabel sx={{ fontSize: '16px' }}>Gender</InputLabel>
                <Select
                  value={parentData.gender}
                  label="Gender"
                  onChange={(e) => handleInputChange(`parent${parentNumber}_card.gender`, e.target.value)}
                  sx={{
                    height: 56,
                    fontSize: '16px',
                    '& .MuiSelect-select': {
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '16px'
                    }
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
                value={parentData.birth_date}
                onChange={(e) => handleInputChange(`parent${parentNumber}_card.birth_date`, e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    fontSize: '16px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Address"
                value={parentData.address}
                onChange={(e) => handleInputChange(`parent${parentNumber}_card.address`, e.target.value)}
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
              disabled={activeStep === 0}
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
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => setShowConfirmDialog(true)}
                  disabled={loading || !isStepValid(activeStep)}
                  sx={{ 
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '16px',
                    fontWeight: 600
                  }}
                >
                  {loading ? (isEditing ? 'Updating Student...' : 'Creating Student...') : (isEditing ? 'Update Student' : 'Create Student')}
                </Button>
              ) : (
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
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ParentInformation; 