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

const SectionSelector = ({ 
  sections, 
  selectedSection, 
  onSectionChange, 
  loading, 
  error 
}) => {
  const handleChange = (event) => {
    const sectionId = event.target.value;
    const section = sections.find(s => s.id === sectionId);
    onSectionChange(section);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={20} />
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
    <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel>Select Section</InputLabel>
        <Select
          value={selectedSection?.id || ''}
          onChange={handleChange}
          label="Select Section"
        >
          {sections.map((section) => (
            <MenuItem key={section.id} value={section.id}>
              <Box>
                <Typography variant="body2">
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
