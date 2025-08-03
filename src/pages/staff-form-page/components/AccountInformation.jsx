import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import {
  Security,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const AccountInformation = ({
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  isEditing,
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
            <Security />
            Account Information
          </Typography>
          
          {/* Row 1: Username and Password */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <TextField
                fullWidth
                label="Username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
                helperText="This will be used for login"
                error={formData.username && formData.username.length < 3}
                inputProps={{ minLength: 3 }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    fontSize: '16px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required={!isEditing}
                error={formData.password && formData.password.length < 8}
                helperText={formData.password && formData.password.length < 8 ? 
                  "Password must be at least 8 characters" : (isEditing ? "Leave empty to keep current password" : "Minimum 8 characters")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    fontSize: '16px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                helperText="Format: 09XXXXXXXX"
                error={formData.phone && !/^09\d{8}$/.test(formData.phone)}
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
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
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

          {/* Row 2: Last Name */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-evenly' }}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
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

export default AccountInformation; 