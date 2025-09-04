import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const CreateFeeDialog = ({
  open,
  onClose,
  formData,
  formErrors,
  loading,
  onInputChange,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

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
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('createFee')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {t('createFeeDescription')}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          {/* Symbol Field */}
          <TextField
            fullWidth
            label={t('symbol')}
            value={formData.symbol}
            onChange={(e) => onInputChange('symbol', e.target.value)}
            error={!!formErrors.symbol}
            helperText={formErrors.symbol}
            placeholder={t('enterSymbol')}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          {/* Name Field */}
          <TextField
            fullWidth
            label={t('name')}
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            error={!!formErrors.name}
            helperText={formErrors.name}
            placeholder={t('enterFeeName')}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          {/* Description Field */}
          <TextField
            fullWidth
            label={t('description')}
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            multiline
            rows={3}
            placeholder={t('enterDescription')}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          {/* Value Field */}
          <TextField
            fullWidth
            label={t('value')}
            type="number"
            value={formData.value}
            onChange={(e) => onInputChange('value', parseFloat(e.target.value) || '')}
            error={!!formErrors.value}
            helperText={formErrors.value}
            placeholder={t('enterValue')}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          {/* Switches Row */}
          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_chosen}
                  onChange={(e) => onInputChange('is_chosen', e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {t('chosen')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('chosenDescription')}
                  </Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_installment_available}
                  onChange={(e) => onInputChange('is_installment_available', e.target.checked)}
                  color="secondary"
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {t('installmentAvailable')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('installmentDescription')}
                  </Typography>
                </Box>
              }
            />
          </Box>
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
          onClick={onSubmit}
          variant="contained"
          disabled={loading}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          {loading ? t('creating') : t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFeeDialog;
