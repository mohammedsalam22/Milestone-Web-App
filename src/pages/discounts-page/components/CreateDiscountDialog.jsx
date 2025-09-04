import React from 'react';
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
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const CreateDiscountDialog = ({
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
          {t('createDiscount')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {t('createDiscountDescription')}
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
            placeholder={t('enterDiscountName')}
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

          {/* Value and Type Row */}
          <Box sx={{ display: 'flex', gap: 2 }}>
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

            <FormControl fullWidth>
              <InputLabel>{t('discountType')}</InputLabel>
              <Select
                value={formData.discount_type}
                onChange={(e) => onInputChange('discount_type', e.target.value)}
                label={t('discountType')}
                error={!!formErrors.discount_type}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="percent">{t('percentage')}</MenuItem>
                <MenuItem value="fixed">{t('fixedAmount')}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Helper Text */}
          <Typography variant="caption" color="text.secondary">
            {formData.discount_type === 'percent' 
              ? t('percentageHelperText') 
              : t('fixedAmountHelperText')
            }
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

export default CreateDiscountDialog;
