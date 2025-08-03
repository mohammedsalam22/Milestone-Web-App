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

const StudentPersonalInformation = ({
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
            Student Personal Information
          </Typography>
          
          {/* Row 1: First Name, Last Name, Phone Number, Nationality */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.card.first_name}
                onChange={(e) => handleInputChange('card.first_name', e.target.value)}
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
                value={formData.card.last_name}
                onChange={(e) => handleInputChange('card.last_name', e.target.value)}
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
                value={formData.card.phone}
                onChange={(e) => handleInputChange('card.phone', e.target.value)}
                required
                error={formData.card.phone && !/^09\d{8}$/.test(formData.card.phone)}
                helperText={formData.card.phone && !/^09\d{8}$/.test(formData.card.phone) ? 
                  "Phone number must start with 09 and be 10 digits" : "Format: 0912345678"}
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
                value={formData.card.nationality}
                onChange={(e) => handleInputChange('card.nationality', e.target.value)}
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
          
          {/* Row 2: Address, Place of Register, Birth City, National Number */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <TextField
                fullWidth
                label="Address"
                value={formData.card.address}
                onChange={(e) => handleInputChange('card.address', e.target.value)}
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
                label="Place of Register"
                value={formData.card.place_of_register}
                onChange={(e) => handleInputChange('card.place_of_register', e.target.value)}
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
                value={formData.card.birth_city}
                onChange={(e) => handleInputChange('card.birth_city', e.target.value)}
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
                value={formData.card.national_no}
                onChange={(e) => handleInputChange('card.national_no', e.target.value)}
                required
                error={formData.card.national_no && formData.card.national_no.length !== 13}
                helperText={formData.card.national_no && formData.card.national_no.length !== 13 ? 
                  "National number must be exactly 13 digits" : "13 digits national ID"}
                inputProps={{ maxLength: 13 }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    fontSize: '16px'
                  }
                }}
              />
            </Box>
          </Box>
          
          {/* Row 3: Gender and Birth Date */}
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
                  value={formData.card.gender}
                  label="Gender"
                  onChange={(e) => handleInputChange('card.gender', e.target.value)}
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
                value={formData.card.birth_date}
                onChange={(e) => handleInputChange('card.birth_date', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
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

export default StudentPersonalInformation; 