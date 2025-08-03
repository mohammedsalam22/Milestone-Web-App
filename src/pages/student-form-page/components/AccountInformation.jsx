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
  InputAdornment,
  IconButton,
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
  sections,
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
              <FormControl fullWidth required>
                <InputLabel>Religion</InputLabel>
                <Select
                  value={formData.religion}
                  label="Religion"
                  onChange={(e) => handleInputChange('religion', e.target.value)}
                  sx={{ 
                    height: 56,
                    fontSize: '16px'
                  }}
                >
                  <MenuItem value="islam">Islam</MenuItem>
                  <MenuItem value="christianity">Christianity</MenuItem>
                  <MenuItem value="judaism">Judaism</MenuItem>
                  <MenuItem value="hinduism">Hinduism</MenuItem>
                  <MenuItem value="buddhism">Buddhism</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Section</InputLabel>
                <Select
                  value={formData.section_id}
                  label="Section"
                  onChange={(e) => handleInputChange('section_id', e.target.value)}
                  sx={{ 
                    height: 56,
                    fontSize: '16px'
                  }}
                >
                  {sections.map((section) => (
                    <MenuItem key={section.id} value={section.id}>
                      {section.grade?.name} - Section {section.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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