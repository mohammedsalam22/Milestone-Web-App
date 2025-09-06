import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SectionSelector = ({ 
  sections, 
  selectedSection, 
  onSectionChange, 
  loading, 
  error 
}) => {
  const theme = useTheme();

  const handleChange = (event) => {
    const sectionId = event.target.value;
    const section = sections.find(s => s.id === sectionId);
    onSectionChange(section);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ minWidth: 300, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="section-selector-label">Select Section</InputLabel>
        <Select
          labelId="section-selector-label"
          value={selectedSection?.id || ''}
          onChange={handleChange}
          label="Select Section"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        >
          {sections.map((section) => (
            <MenuItem key={section.id} value={section.id}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Section {section.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {section.grade?.study_stage?.name} - {section.grade?.name}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SectionSelector;
