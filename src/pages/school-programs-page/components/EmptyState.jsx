import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  School as SchoolIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const EmptyState = ({ onCreateProgram }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const isRTL = (language) => ['ar'].includes(language);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: 'center',
        backgroundColor: theme.palette.background.default,
        borderRadius: 3,
        border: `2px dashed ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <SchoolIcon
          sx={{
            fontSize: 64,
            color: theme.palette.text.secondary,
            opacity: 0.6,
          }}
        />
      </Box>
      
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 2,
        }}
      >
        {t('noProgramsYet')}
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          mb: 4,
          maxWidth: '400px',
          mx: 'auto',
          lineHeight: 1.6,
        }}
      >
        {t('createYourFirstProgram')}
      </Typography>
      
      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        onClick={onCreateProgram}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          px: 4,
          py: 1.5,
        }}
      >
        {t('createProgram')}
      </Button>
    </Paper>
  );
};

export default EmptyState; 