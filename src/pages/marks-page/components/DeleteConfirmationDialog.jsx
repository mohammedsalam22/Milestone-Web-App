import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import {
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, mark }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon sx={{ color: theme.palette.warning.main }} />
        {t('Confirm Delete')}
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t('Are you sure you want to delete this mark?')}
        </Typography>
        
        {mark && (
          <Box sx={{ p: 2, backgroundColor: theme.palette.grey[50], borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>{t('Student')}:</strong> {mark.student_name || `${mark.student?.card?.first_name} ${mark.student?.card?.last_name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>{t('Subject')}:</strong> {mark.subject_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>{t('Mark')}:</strong> {mark.mark}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>{t('Exam Type')}:</strong> {mark.mark_type}
            </Typography>
          </Box>
        )}
        
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {t('This action cannot be undone.')}
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
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
          onClick={handleConfirm}
          variant="contained"
          color="error"
          sx={{
            backgroundColor: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.dark,
            },
          }}
        >
          {t('Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
