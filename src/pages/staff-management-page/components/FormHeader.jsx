import React from 'react';
import {
  Typography,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const FormHeader = ({ isEditMode, onGoBack }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = i18n.language === 'ar';
  const BackIcon = isRTL ? ArrowForwardIcon : ArrowBackIcon;

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2, 
      mb: 4,
      flexDirection: isRTL ? 'row-reverse' : 'row'
    }}>
      <Button
        onClick={onGoBack}
        variant="outlined"
        startIcon={<BackIcon />}
        sx={{ borderRadius: 2 }}
      >
        {isEditMode ? t('backToProfile') : t('backToStaff')}
      </Button>
      <Typography variant="h4" component="h1" sx={{ 
        fontWeight: 700,
        ...(isRTL && { textAlign: 'right' }),
        ...(!isRTL && { textAlign: 'left' })
      }}>
        {isEditMode ? t('editStaff') : t('createNewStaffMember')}
      </Typography>
    </Box>
  );
};

export default FormHeader; 