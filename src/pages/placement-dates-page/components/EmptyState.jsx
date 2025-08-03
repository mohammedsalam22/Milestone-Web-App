import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const EmptyState = ({ onCreateNew }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        p: 6,
        textAlign: 'center',
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        border: `2px dashed ${theme.palette.divider}`,
        maxWidth: 500,
        mx: 'auto',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <CalendarIcon 
          sx={{ 
            fontSize: 80, 
            color: theme.palette.text.secondary,
            opacity: 0.6,
          }} 
        />
      </Box>

      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 600, 
          mb: 2,
          color: theme.palette.text.primary,
        }}
      >
        {t('noPlacementTestsYet')}
      </Typography>

      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ 
          mb: 4,
          maxWidth: 400,
          mx: 'auto',
          lineHeight: 1.6,
        }}
      >
        {t('createYourFirstPlacementTest')}
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        onClick={onCreateNew}
        sx={{
          borderRadius: 2,
          px: 4,
          py: 1.5,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '1.1rem',
          boxShadow: theme.shadows[2],
          '&:hover': {
            boxShadow: theme.shadows[4],
          }
        }}
      >
        {t('scheduleFirstTest')}
      </Button>
    </Paper>
  );
};

export default EmptyState; 