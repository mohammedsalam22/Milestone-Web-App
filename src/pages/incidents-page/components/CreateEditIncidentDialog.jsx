import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  Autocomplete,
  CircularProgress,
  Alert,
} from '@mui/material';

import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { createIncident, updateIncident } from '../../../featuers/incidents-slice/incidentsSlice';
import { fetchStudents } from '../../../featuers/students-slice/studentsSlice';

const CreateEditIncidentDialog = ({ open, onClose, isEditMode, incident, sections, studentsLoading }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.incidents);
  const { students } = useSelector((state) => state.students);
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    students: [],
    title: '',
    procedure: '',
    note: '',
    date: new Date().toISOString().slice(0, 16),
  });

  const [errors, setErrors] = useState({});
  const isRTL = (language) => ['ar'].includes(language);

  useEffect(() => {
    if (open) {
      dispatch(fetchStudents());
    }
  }, [open, dispatch]);

  // Debug: Log students data
  useEffect(() => {
    console.log('Students in dialog:', students);
    console.log('Students length:', students?.length);
    if (students.length > 0) {
      console.log('First student:', students[0]);
      console.log('First student keys:', Object.keys(students[0]));
      console.log('First student name:', students[0]?.name);
      console.log('First student id:', students[0]?.id);
    }
  }, [students]);

  // Create mock students if none are available (for testing)
  const mockStudents = [
    { 
      id: 1, 
      card: { first_name: 'John', last_name: 'Doe' }, 
      section: { id: 1, name: 'A' } 
    },
    { 
      id: 2, 
      card: { first_name: 'Jane', last_name: 'Smith' }, 
      section: { id: 1, name: 'A' } 
    },
    { 
      id: 3, 
      card: { first_name: 'Mike', last_name: 'Johnson' }, 
      section: { id: 2, name: 'B' } 
    },
  ];

  // Use mock students if real students are not available
  const availableStudents = students && students.length > 0 ? students : mockStudents;

  useEffect(() => {
    if (isEditMode && incident) {
      setFormData({
        students: incident.student_names.map(s => s.id),
        title: incident.title,
        procedure: incident.procedure,
        note: incident.note,
        date: new Date(incident.date).toISOString().slice(0, 16),
      });
    } else {
      setFormData({
        students: [],
        title: '',
        procedure: '',
        note: '',
        date: new Date().toISOString().slice(0, 16),
      });
    }
    setErrors({});
  }, [isEditMode, incident, open]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.students.length) {
      newErrors.students = t('pleaseSelectStudents');
    }
    if (!formData.title.trim()) {
      newErrors.title = t('titleIsRequired');
    }
    if (!formData.procedure.trim()) {
      newErrors.procedure = t('procedureIsRequired');
    }
    if (!formData.note.trim()) {
      newErrors.note = t('noteIsRequired');
    }
    if (!formData.date || formData.date.trim() === '') {
      newErrors.date = t('dateIsRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      date: new Date(formData.date + ':00').toISOString(),
    };

    try {
      if (isEditMode) {
        await dispatch(updateIncident({ id: incident.id, data: submitData }));
      } else {
        await dispatch(createIncident(submitData));
      }
      onClose();
    } catch (error) {
      // Error handling is done in the slice
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const getStudentLabel = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : '';
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {isEditMode ? t('editIncident') : t('createNewIncident')}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          {/* Students Selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>

            {studentsLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  Loading students...
                </Typography>
              </Box>
                         ) : availableStudents.length === 0 ? (
               <Box sx={{ p: 2, textAlign: 'center' }}>
                 <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                   No students available. Please ensure students are loaded in the system.
                 </Typography>
                 <Button 
                   variant="outlined" 
                   size="small" 
                   onClick={() => dispatch(fetchStudents())}
                 >
                   Retry Loading Students
                 </Button>
               </Box>
             ) : (
              <Autocomplete
                multiple
                options={availableStudents}
                getOptionLabel={(option) => {
                  if (!option) return 'Unknown Student';
                  // Use the correct nested structure from the API
                  if (option.card && option.card.first_name && option.card.last_name) {
                    return `${option.card.first_name} ${option.card.last_name}`;
                  }
                  // Fallback to other possible field names
                  return option.name || option.first_name || option.full_name || option.username || 'Unknown Student';
                }}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                value={availableStudents.filter(student => 
                  student && student.id && formData.students.includes(student.id)
                )}
                onChange={(event, newValue) => {
                  console.log('Selected students:', newValue);
                  const studentIds = newValue
                    .filter(student => student && student.id)
                    .map(student => student.id);
                  console.log('Student IDs:', studentIds);
                  handleInputChange('students', studentIds);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('selectStudents')}
                    error={!!errors.students}
                    helperText={errors.students}
                    placeholder={t('searchStudents')}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option.id}
                      label={`${option.card && option.card.first_name && option.card.last_name 
                        ? `${option.card.first_name} ${option.card.last_name}`
                        : option.name || option.first_name || option.full_name || option.username || 'Unknown Student'
                      }${option.section ? ` (${option.section.name})` : ''}`}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
                loading={loading}
                noOptionsText="No students found"
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Typography variant="body2">
                      {option.card && option.card.first_name && option.card.last_name 
                        ? `${option.card.first_name} ${option.card.last_name}`
                        : option.name || option.first_name || option.full_name || option.username || 'Unknown Student'
                      }
                    </Typography>
                    {option.section && option.section.id && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        ({option.section.name})
                      </Typography>
                    )}
                  </Box>
                )}
              />
            )}
          </FormControl>

          {/* Title */}
          <TextField
            fullWidth
            label={t('incidentTitle')}
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 3 }}
            placeholder={t('enterIncidentTitle')}
          />

          {/* Procedure */}
          <TextField
            fullWidth
            label={t('procedure')}
            value={formData.procedure}
            onChange={(e) => handleInputChange('procedure', e.target.value)}
            error={!!errors.procedure}
            helperText={errors.procedure}
            multiline
            rows={3}
            sx={{ mb: 3 }}
            placeholder={t('enterProcedure')}
          />

          {/* Note */}
          <TextField
            fullWidth
            label={t('note')}
            value={formData.note}
            onChange={(e) => handleInputChange('note', e.target.value)}
            error={!!errors.note}
            helperText={errors.note}
            multiline
            rows={4}
            sx={{ mb: 3 }}
            placeholder={t('enterNote')}
          />

          {/* Date and Time */}
          <TextField
            type="datetime-local"
            label={t('dateAndTime')}
            value={formData.date || ''}
            onChange={(e) => handleInputChange('date', e.target.value)}
            fullWidth
            error={!!errors.date}
            helperText={errors.date}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 3 }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {t('cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {loading ? t('saving') : (isEditMode ? t('update') : t('create'))}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditIncidentDialog;
