import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useScheduleData } from './useScheduleData';

const PeriodDialog = ({ 
  open, 
  onClose, 
  onSave, 
  schedule = null, 
  day = '', 
  startTime = '', 
  endTime = '', 
  mode = 'add' 
}) => {
  const theme = useTheme();
  const { teachers, sections, loading: dataLoading, error: dataError } = useScheduleData();
  
  const [formData, setFormData] = useState({
    teacher_id: '',
    section_id: '',
    day: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    if (schedule && mode === 'edit') {
      console.log('Setting form data for edit:', schedule);
      setFormData({
        teacher_id: schedule.teacher?.id || '',
        section_id: schedule.section?.id || '',
        day: schedule.day || '',
        start_time: schedule.start_time || '',
        end_time: schedule.end_time || '',
      });
    } else if (day && startTime && endTime && mode === 'add') {
      setFormData({
        teacher_id: '',
        section_id: '',
        day: day,
        start_time: startTime,
        end_time: endTime,
      });
    }
  }, [schedule, day, startTime, endTime, mode]);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSave = () => {
    // For add mode, validate all fields
    if (mode === 'add') {
      if (formData.teacher_id && formData.section_id && formData.day && formData.start_time && formData.end_time) {
        console.log('Saving new schedule data:', formData);
        onSave(formData);
        onClose();
      }
    } else {
      // For edit mode, only validate and send teacher_id, start_time, and end_time
      if (formData.teacher_id && formData.start_time && formData.end_time) {
        const editData = {
          teacher_id: formData.teacher_id,
          start_time: formData.start_time,
          end_time: formData.end_time
        };
        console.log('Saving updated schedule data (filtered):', editData);
        onSave(editData);
        onClose();
      }
    }
  };

  const handleClose = () => {
    setFormData({
      teacher_id: '',
      section_id: '',
      day: '',
      start_time: '',
      end_time: '',
    });
    onClose();
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const time = timeString.split(':');
    return `${time[0]}:${time[1]}`;
  };

  const handleTimeChange = (field) => (event) => {
    const timeValue = event.target.value;
    // Convert HH:MM to HH:MM:SS format
    const formattedTime = timeValue ? `${timeValue}:00` : '';
    setFormData(prev => ({
      ...prev,
      [field]: formattedTime,
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        {mode === 'add' ? 'Add Schedule Period' : 'Edit Schedule Period'}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        {dataError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {dataError}
          </Alert>
        )}
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Day: <strong>{day}</strong>
          </Typography>
          {mode === 'add' && (
            <Typography variant="body2" color="textSecondary">
              Time: <strong>{formatTime(startTime)} - {formatTime(endTime)}</strong>
            </Typography>
          )}
        </Box>
        
        {dataLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {console.log('Available teachers:', teachers.map(t => ({ id: t.id, name: t.user?.username })))}
            {console.log('Available sections:', sections.map(s => ({ id: s.id, name: s.name })))}
            {console.log('Current form data:', formData)}
            <FormControl fullWidth margin="normal" required>
               <InputLabel>Teacher</InputLabel>
               <Select
                 value={formData.teacher_id || ''}
                 onChange={handleInputChange('teacher_id')}
                 label="Teacher"
               >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    <Box>
                      <Typography variant="body2">
                        {teacher.user?.first_name} {teacher.user?.last_name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {teacher.user?.username}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
                         <FormControl fullWidth margin="normal" required>
               <InputLabel>Section</InputLabel>
               <Select
                 value={formData.section_id || ''}
                 onChange={handleInputChange('section_id')}
                 label="Section"
                 disabled={mode === 'edit'}
               >
                {sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    <Box>
                      <Typography variant="body2">
                        Section {section.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {section.grade?.name} - {section.grade?.study_stage?.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField
                label="Start Time"
                type="time"
                value={formatTime(formData.start_time)}
                onChange={handleTimeChange('start_time')}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ flex: 1 }}
              />
              
              <TextField
                label="End Time"
                type="time"
                value={formatTime(formData.end_time)}
                onChange={handleTimeChange('end_time')}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ flex: 1 }}
              />
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
                 <Button
           onClick={handleSave}
           variant="contained"
           disabled={
             dataLoading || 
             !formData.teacher_id || 
             (mode === 'add' && !formData.section_id) || 
             (mode === 'add' && !formData.day) || 
             !formData.start_time || 
             !formData.end_time
           }
         >
          {mode === 'add' ? 'Add' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PeriodDialog; 