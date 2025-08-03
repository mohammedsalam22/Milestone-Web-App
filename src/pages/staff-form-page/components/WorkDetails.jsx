import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Button,
} from '@mui/material';
import {
  Work,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const WorkDetails = ({
  formData,
  handleInputChange,
  subjects,
  activeStep,
  handleBack,
  handleNext,
  isStepValid,
}) => {
  const theme = useTheme();

  const handleSubjectChange = (event) => {
    const {
      target: { value },
    } = event;
    handleInputChange('subjectIDs', typeof value === 'string' ? value.split(',') : value);
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
            <Work />
            Work Details
          </Typography>
          
                     {/* Row 1: Role */}
           <Box sx={{ mb: 3 }}>
             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-between' }}>
               <FormControl fullWidth required>
                 <InputLabel>Role</InputLabel>
                 <Select
                   value={formData.role || 'none'}
                   label="Role"
                   onChange={(e) => handleInputChange('role', e.target.value)}
                   sx={{ 
                     height: 56,
                     fontSize: '16px'
                   }}
                 >
                   <MenuItem value="none">Select Role</MenuItem>
                   <MenuItem value="teacher">Teacher</MenuItem>
                   <MenuItem value="admin">Administrator</MenuItem>
                   <MenuItem value="staff">Staff Member</MenuItem>
                   <MenuItem value="principal">Principal</MenuItem>
                   <MenuItem value="vice_principal">Vice Principal</MenuItem>
                 </Select>
               </FormControl>
             </Box>
           </Box>

           {/* Row 2: Salary */}
           <Box sx={{ mb: 3 }}>
             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-between' }}>
               <TextField
                 fullWidth
                 label="Salary"
                 value={formData.salary}
                 onChange={(e) => handleInputChange('salary', e.target.value)}
                 required
                 type="number"
                 helperText="Monthly salary in currency"
                 sx={{ 
                   '& .MuiOutlinedInput-root': {
                     height: 56,
                     fontSize: '16px'
                   }
                 }}
               />
             </Box>
           </Box>

                     {/* Row 3: Subjects (only for teachers) */}
           {formData.role === 'teacher' && (
             <Box sx={{ mb: 3 }}>
               <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, justifyContent: 'space-between' }}>
                 <FormControl fullWidth required sx={{ gridColumn: 'span 2' }}>
                   <InputLabel>Subjects</InputLabel>
                   <Select
                     multiple
                     value={formData.subjectIDs}
                     onChange={handleSubjectChange}
                     input={<OutlinedInput label="Subjects" />}
                     renderValue={(selected) => (
                       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                         {selected.map((value) => {
                           const subject = subjects.find(s => s.id === value);
                           return (
                             <Chip 
                               key={value} 
                               label={subject ? subject.name : value} 
                               size="small"
                             />
                           );
                         })}
                       </Box>
                     )}
                     sx={{ 
                       height: 56,
                       fontSize: '16px'
                     }}
                   >
                     {subjects.map((subject) => (
                       <MenuItem key={subject.id} value={subject.id}>
                         {subject.name}
                       </MenuItem>
                     ))}
                   </Select>
                 </FormControl>
               </Box>
             </Box>
           )}

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

export default WorkDetails; 