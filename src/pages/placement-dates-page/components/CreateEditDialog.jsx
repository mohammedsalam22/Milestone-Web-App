import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const CreateEditDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  submitButtonText,
  placementDate = null,
  loading = false,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    date: '',
    limit: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (placementDate) {
      // Format date for datetime-local input
      const date = new Date(placementDate.date);
      const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      
      setFormData({
        date: localDateTime,
        limit: placementDate.limit.toString(),
      });
    } else {
      setFormData({
        date: '',
        limit: '',
      });
    }
    setErrors({});
  }, [placementDate, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = t('dateTimeRequired');
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.date = t('dateMustBeFuture');
      }
    }

    if (!formData.limit) {
      newErrors.limit = t('capacityRequired');
    } else {
      const limit = parseInt(formData.limit);
      if (isNaN(limit) || limit <= 0) {
        newErrors.limit = t('capacityPositive');
      } else if (limit > 100) {
        newErrors.limit = t('capacityMax');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        date: new Date(formData.date).toISOString(),
        limit: parseInt(formData.limit),
      };
      onSubmit(submitData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: theme.shadows[8],
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Date and Time Field */}
            <TextField
              label={t('dateTime')}
              type="datetime-local"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              error={!!errors.date}
              helperText={errors.date}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().slice(0, 16),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            {/* Capacity Limit Field */}
            <TextField
              label={t('studentCapacity')}
              type="number"
              value={formData.limit}
              onChange={(e) => handleInputChange('limit', e.target.value)}
              error={!!errors.limit}
              helperText={errors.limit || t('maximumStudents')}
              fullWidth
              inputProps={{
                min: 1,
                max: 100,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            {/* Preview */}
            {formData.date && formData.limit && !errors.date && !errors.limit && (
              <Box sx={{ 
                p: 2, 
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Preview:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('testScheduledFor')}: {new Date(formData.date).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('capacity')}: {formData.limit} {t('students')}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ 
          px: 3, 
          pb: 3,
          gap: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}>
          <Button
            onClick={onClose}
            variant="outlined"
            disabled={loading}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 100,
            }}
          >
            {loading ? 'Processing...' : submitButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateEditDialog; 