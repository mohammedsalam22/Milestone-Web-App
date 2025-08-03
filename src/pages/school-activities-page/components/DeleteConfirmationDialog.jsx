import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, activity, loading }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const isRTL = (language) => ['ar'].includes(language);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <WarningIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {t('deleteActivity')}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          {t('deleteActivityConfirmation')}
        </Alert>

        {activity && (
          <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {activity.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activity.description}
            </Typography>
          </Box>
        )}

        <Typography variant="body1" sx={{ mt: 2, color: theme.palette.text.secondary }}>
          {t('deleteConfirmation')} {t('activity')} {t('deleteConfirmationEnd')}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          disabled={loading}
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
          color="error"
          onClick={onConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          {loading ? t('deleting') : t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog; 