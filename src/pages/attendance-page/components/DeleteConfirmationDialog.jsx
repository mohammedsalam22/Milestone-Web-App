import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const DeleteConfirmationDialog = ({
  open,
  onClose,
  selectedAttendance,
  loading,
  onConfirm,
}) => {
  const { t } = useTranslation();

  if (!selectedAttendance) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('deleteAttendance')}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t('deleteAttendanceConfirmation')}
        </Typography>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.default', 
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            {t('attendanceDetails')}:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('student')}:</strong> {selectedAttendance.student_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('date')}:</strong> {new Date(selectedAttendance.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('status')}:</strong> {
              selectedAttendance.absent 
                ? (selectedAttendance.excused ? t('excused') : t('absent'))
                : t('present')
            }
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} color="inherit">
          {t('cancel')}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          {loading ? <CircularProgress size={20} /> : t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
