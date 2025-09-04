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
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const EditMarkDialog = ({ 
  open, 
  onClose, 
  onSave, 
  mark, 
  loading = false,
  error = null 
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const [markValue, setMarkValue] = useState('');
  const [validationError, setValidationError] = useState('');

  // Initialize mark value when dialog opens
  useEffect(() => {
    if (mark && open) {
      setMarkValue(mark.mark.toString());
      setValidationError('');
    }
  }, [mark, open]);

  const handleMarkChange = (value) => {
    setMarkValue(value);
    setValidationError('');
    
    // Validate mark
    const numValue = parseFloat(value);
    if (value === '') {
      setValidationError(t('Mark is required'));
    } else if (isNaN(numValue)) {
      setValidationError(t('Please enter a valid number'));
    } else if (numValue < 0) {
      setValidationError(t('Mark cannot be negative'));
    } else if (numValue > mark.top_mark) {
      setValidationError(t(`Mark cannot exceed ${mark.top_mark}`));
    }
  };

  const handleSave = () => {
    const numValue = parseFloat(markValue);
    
    // Final validation
    if (markValue === '') {
      setValidationError(t('Mark is required'));
      return;
    }
    
    if (isNaN(numValue)) {
      setValidationError(t('Please enter a valid number'));
      return;
    }
    
    if (numValue < 0) {
      setValidationError(t('Mark cannot be negative'));
      return;
    }
    
    if (numValue > mark.top_mark) {
      setValidationError(t(`Mark cannot exceed ${mark.top_mark}`));
      return;
    }

    // Call the save function
    onSave({
      id: mark.id,
      mark: numValue,
    });
  };

  const handleClose = () => {
    setMarkValue('');
    setValidationError('');
    onClose();
  };

  const isSaveDisabled = loading || validationError || markValue === '';

  if (!mark) return null;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        backgroundColor: theme.palette.primary.main,
        color: 'white'
      }}>
        <EditIcon />
        {t('Edit Student Mark')}
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('Student Information')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>{t('Name')}:</strong> {mark.student_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>{t('Subject')}:</strong> {mark.subject_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>{t('Exam Type')}:</strong> {mark.mark_type}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('Current Mark Details')}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>{t('Current Mark')}:</strong> {mark.mark}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>{t('Top Mark')}:</strong> {mark.top_mark}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>{t('Pass Mark')}:</strong> {mark.pass_mark}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>{t('Date')}:</strong> {mark.date}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {t('Update Mark')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('Enter the new mark for this student. The mark must be between 0 and')} {mark.top_mark}.
          </Typography>
          
          <TextField
            fullWidth
            type="number"
            label={t('New Mark')}
            value={markValue}
            onChange={(e) => handleMarkChange(e.target.value)}
            error={!!validationError}
            helperText={validationError}
            inputProps={{
              min: 0,
              max: mark.top_mark,
              step: 0.01,
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
              },
            }}
            placeholder="0"
          />
          
          {markValue && !validationError && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.grey[50], borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>{t('Mark Status')}:</strong> {
                  parseFloat(markValue) >= mark.pass_mark 
                    ? t('Pass') 
                    : t('Fail')
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>{t('Percentage')}:</strong> {
                  ((parseFloat(markValue) / mark.top_mark) * 100).toFixed(1)
                }%
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={handleClose}
          disabled={loading}
          sx={{
            borderColor: theme.palette.grey[400],
            color: theme.palette.grey[700],
            '&:hover': {
              borderColor: theme.palette.grey[600],
              backgroundColor: theme.palette.grey[50],
            },
          }}
        >
          {t('Cancel')}
        </Button>
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
          onClick={handleSave}
          disabled={isSaveDisabled}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            '&:disabled': {
              backgroundColor: theme.palette.grey[300],
              color: theme.palette.grey[500],
            },
          }}
        >
          {loading ? t('Saving...') : t('Save Changes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMarkDialog;
