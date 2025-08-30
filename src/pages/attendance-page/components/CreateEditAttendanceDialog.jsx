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
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Autocomplete,
  Chip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { createAttendance, updateAttendance } from '../../../featuers/attendances-slice/attendancesSlice';

const CreateEditAttendanceDialog = ({
  open,
  onClose,
  isEditMode,
  attendance,
  sections,
  studentsLoading,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.attendances);
  const { students } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    student_id: '',
    date: '',
    absent: false,
    excused: false,
    note: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && attendance) {
      setFormData({
        student_id: attendance.student_id,
        date: attendance.date,
        absent: attendance.absent,
        excused: attendance.excused,
        note: attendance.note,
      });
    } else {
      setFormData({
        student_id: '',
        date: new Date().toISOString().split('T')[0],
        absent: false,
        excused: false,
        note: '',
      });
    }
    setErrors({});
  }, [isEditMode, attendance, open]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.student_id) newErrors.student_id = t('studentRequired');
    if (!formData.date) newErrors.date = t('dateRequired');
    if (formData.absent && formData.excused) {
      newErrors.excused = t('cannotBeExcusedAndAbsent');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isEditMode) {
        await dispatch(updateAttendance({ id: attendance.id, data: formData }));
      } else {
        await dispatch(createAttendance(formData));
      }
      onClose();
    } catch (error) {
      // Error handling is done in the slice
    }
  };

  const handleClose = () => {
    setFormData({
      student_id: '',
      date: new Date().toISOString().split('T')[0],
      absent: false,
      excused: false,
      note: '',
    });
    setErrors({});
    onClose();
  };

  const getStudentDisplayName = (student) => {
    if (student.card && student.card.first_name && student.card.last_name) {
      return `${student.card.first_name} ${student.card.last_name}`;
    }
    return student.name || student.first_name || student.full_name || student.username || 'Unknown Student';
  };

  const getStudentSectionName = (student) => {
    return student.section?.name || 'Unknown Section';
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditMode ? t('editAttendance') : t('createAttendance')}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          {/* Student Selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              {t('student')} *
            </Typography>
            {studentsLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">Loading students...</Typography>
              </Box>
            ) : students.length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  No students available. Please ensure students are loaded in the system.
                </Typography>
              </Box>
            ) : (
              <Autocomplete
                options={students}
                getOptionLabel={(option) => getStudentDisplayName(option)}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                value={students.find(s => s.id === formData.student_id) || null}
                onChange={(event, newValue) => {
                  handleInputChange('student_id', newValue?.id || '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t('selectStudent')}
                    error={!!errors.student_id}
                    helperText={errors.student_id}
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Typography variant="body2">{getStudentDisplayName(option)}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      ({getStudentSectionName(option)})
                    </Typography>
                  </Box>
                )}
                noOptionsText={t('noStudentsFound')}
              />
            )}
          </FormControl>

          {/* Date Selection */}
          <TextField
            fullWidth
            type="date"
            label={t('date')}
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            error={!!errors.date}
            helperText={errors.date}
            sx={{ mb: 3 }}
            InputLabelProps={{ shrink: true }}
          />

          {/* Status Checkboxes */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              {t('status')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.absent}
                    onChange={(e) => handleInputChange('absent', e.target.checked)}
                    color="error"
                  />
                }
                label={t('absent')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.excused}
                    onChange={(e) => handleInputChange('excused', e.target.checked)}
                    color="warning"
                    disabled={!formData.absent}
                  />
                }
                label={t('excused')}
              />
            </Box>
            {errors.excused && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.excused}
              </Typography>
            )}
          </Box>

          {/* Note */}
          <TextField
            fullWidth
            label={t('note')}
            value={formData.note}
            onChange={(e) => handleInputChange('note', e.target.value)}
            multiline
            rows={3}
            placeholder={t('attendanceNotePlaceholder')}
            sx={{ mb: 3 }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} color="inherit">
          {t('cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          {loading ? <CircularProgress size={20} /> : (isEditMode ? t('update') : t('create'))}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditAttendanceDialog;
