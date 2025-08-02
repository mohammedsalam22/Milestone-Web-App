import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const FormNavigation = ({ 
  activeStep, 
  steps, 
  loading, 
  isEditMode, 
  onBack, 
  onNext, 
  onCancel, 
  onSubmit 
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = i18n.language === 'ar';

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      flexDirection: isRTL ? 'row-reverse' : 'row'
    }}>
      <Button
        disabled={activeStep === 0}
        onClick={onBack}
        variant="outlined"
        sx={{ borderRadius: 2, px: 3 }}
      >
        {t('back')}
      </Button>
      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{ borderRadius: 2, px: 3 }}
        >
          {t('cancel')}
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            onClick={onSubmit}
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={loading}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {loading ? (isEditMode ? t('updating') : t('creating')) : (isEditMode ? t('updateStaffMember') : t('createStaffMember'))}
          </Button>
        ) : (
          <Button
            onClick={onNext}
            variant="contained"
            sx={{ borderRadius: 2, px: 3 }}
          >
            {t('next')}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FormNavigation; 