import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  AccountTree as AccountTreeIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const EmptyState = ({ onCreateStudyStage }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const theme = useTheme();

  return (
    <Box textAlign="center" py={6}>
      <Box sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: theme.palette.primary.main,
        mb: 3,
        boxShadow: theme.shadows[6]
      }}>
        <AccountTreeIcon sx={{ fontSize: 48, color: 'white' }} />
      </Box>
      <Typography variant="h5" sx={{ 
        fontWeight: 600, 
        color: 'text.primary', 
        mb: 2 
      }}>
        {t('noStudyStagesYet')}
      </Typography>
      <Typography variant="body1" sx={{ 
        color: 'text.secondary',
        mb: 4,
        maxWidth: 400,
        mx: 'auto'
      }}>
        {t('createYourFirstStudyStage')}
      </Typography>
      <Button
        variant="contained"
        startIcon={isRTL ? null : <AddIcon />}
        endIcon={isRTL ? <AddIcon /> : null}
        onClick={onCreateStudyStage}
        sx={{
          borderRadius: 2,
          px: 4,
          py: 1.5,
          fontWeight: 600,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[8]
          },
          transition: 'all 0.3s ease'
        }}
      >
        {t('createStudyStage')}
      </Button>
    </Box>
  );
};

export default EmptyState; 