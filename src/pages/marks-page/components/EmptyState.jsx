import React from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const EmptyState = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 6,
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <AssignmentIcon
          sx={{
            fontSize: 64,
            color: theme.palette.grey[400],
          }}
        />
        <Typography variant="h5" color="text.secondary" fontWeight="medium">
          {t('No Marks Data Available')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
          {t('Please select the required filters (Subject, Grade, Section, and Exam Type) and click "Search Marks" to view student performance data.')}
        </Typography>
      </Box>
    </Paper>
  );
};

export default EmptyState;
