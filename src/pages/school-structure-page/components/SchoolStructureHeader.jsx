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

const SchoolStructureHeader = ({ onCreateStudyStage }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const theme = useTheme();

  return (
    <Box sx={{ 
      mb: 4, 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      py: 3,
      px: 2,
    }}>
      <Typography variant="h4" component="h1">
        {t('schoolStructure')}
      </Typography>
      <Button
        variant="contained"
        startIcon={isRTL ? null : <AddIcon />}
        endIcon={isRTL ? <AddIcon /> : null}
        onClick={onCreateStudyStage}
        sx={{ 
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: 600,
          px: 3,
          py: 1.5,
          borderRadius: 2,
          '&:hover': {
            background: theme.palette.primary.dark,
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[8]
          },
          transition: 'all 0.3s ease',
          ...(isRTL && { flexDirection: 'row-reverse' })
        }}
      >
        {t('createStudyStage')}
      </Button>
    </Box>
  );
};

export default SchoolStructureHeader; 