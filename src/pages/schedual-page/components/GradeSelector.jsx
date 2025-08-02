import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GradeSelector = ({ grades, selectedGrade, onGradeChange, loading }) => {
  const theme = useTheme();





  return (
    <FormControl disabled={loading} sx={{ minWidth: 200 }}>
      <InputLabel id="grade-select-label">Select Grade</InputLabel>
      <Select
        labelId="grade-select-label"
        id="grade-select"
        value={selectedGrade?.id || ''}
        label="Select Grade"
        displayEmpty
        onChange={(e) => {
          const grade = grades.find(g => g.id === e.target.value);
          onGradeChange(grade);
        }}
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 1,
            px: 2,
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            '&:hover': {
              backgroundColor: theme.palette.grey[50],
            },
          },
        }}
      >
        {grades.map((grade) => (
          <MenuItem key={grade.id} value={grade.id} sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {grade.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {grade.study_stage.name}
                </Typography>
              </Box>
                               <Chip
                   label={grade.study_year.name}
                   size="small"
                   variant="outlined"
                   color="primary"
                   sx={{ 
                     ml: 'auto',
                     fontSize: '0.7rem',
                     height: 20,
                   }}
                 />
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GradeSelector; 