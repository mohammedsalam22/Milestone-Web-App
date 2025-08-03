import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { createVisitDate, updateVisitDate, clearError } from '../../../featuers/visit-dates-slice/visitDatesSlice';

const CreateEditVisitDateDialog = ({ open, onClose, visitDate, isEdit }) => {
  const dispatch = useDispatch();
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const { createLoading, updateLoading, error } = useSelector((state) => state.visitDates);

  const [formData, setFormData] = useState({
    date: '',
  });
  const [errors, setErrors] = useState({});

  const isRTL = (language) => ['ar'].includes(language);

  useEffect(() => {
    if (open) {
      if (isEdit && visitDate) {
        // Convert ISO string to local datetime-local format
        const date = new Date(visitDate.date);
        const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        setFormData({
          date: localDateTime,
        });
      } else {
        setFormData({
          date: '',
        });
      }
      setErrors({});
    }
  }, [open, isEdit, visitDate]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

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
    
    if (!formData.date) {
      newErrors.date = t('visitDateRequired');
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate < now) {
        newErrors.date = t('dateCannotBeInPast');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Convert to ISO string for API
      const dateToSend = new Date(formData.date).toISOString();
      
      if (isEdit) {
        await dispatch(updateVisitDate({ id: visitDate.id, visitDateData: { date: dateToSend } }));
      } else {
        await dispatch(createVisitDate({ date: dateToSend }));
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    if (!createLoading && !updateLoading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {isEdit ? t('editVisitDate') : t('createVisitDate')}
          </Typography>
          <IconButton onClick={handleClose} disabled={createLoading || updateLoading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper elevation={0} sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
            {t('selectDateAndTime')} *
          </Typography>
          <TextField
            fullWidth
            type="datetime-local"
            variant="outlined"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            error={!!errors.date}
            helperText={errors.date}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleClose}
          disabled={createLoading || updateLoading}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={createLoading || updateLoading}
          startIcon={createLoading || updateLoading ? <CircularProgress size={20} /> : null}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          {createLoading || updateLoading
            ? (isEdit ? t('updating') : t('creating'))
            : (isEdit ? t('update') : t('create'))
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditVisitDateDialog; 