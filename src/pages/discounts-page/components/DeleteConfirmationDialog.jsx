import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  useTheme,
} from '@mui/material';
import {
  Warning as WarningIcon,
  LocalOffer as DiscountIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const DeleteConfirmationDialog = ({
  open,
  onClose,
  selectedDiscount,
  loading,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  if (!selectedDiscount) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <WarningIcon color="warning" sx={{ fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('deleteDiscount')}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            {t('deleteDiscountWarning')}
          </Alert>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            p: 2, 
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`
          }}>
            <DiscountIcon sx={{ color: theme.palette.primary.main }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {selectedDiscount.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedDiscount.symbol} • {selectedDiscount.discount_type === 'percent' 
                  ? `${selectedDiscount.value}%` 
                  : `${selectedDiscount.value} ${t('currency')}`
                }
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {t('deleteDiscountConfirmation')}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          {t('cancel')}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          {loading ? t('deleting') : t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
