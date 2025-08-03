import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const DeleteConfirmationDialog = ({
  open,
  onClose,
  selectedSubject,
  loading,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('deleteSubject')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('deleteSubjectConfirmation')} "{selectedSubject?.name}"? {t('deleteConfirmationEnd')}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          {t('cancel')}
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={loading} sx={{ borderRadius: 2 }}>
          {loading ? t('deleting') : t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog; 