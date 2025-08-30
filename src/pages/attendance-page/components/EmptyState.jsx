import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  SearchOff as SearchOffIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const EmptyState = ({
  searchTerm,
  sectionFilter,
  dateFilter,
  onCreateClick,
  onClearFilters,
  isRTL,
}) => {
  const { t } = useTranslation();

  const hasActiveFilters = searchTerm || sectionFilter !== 'all' || dateFilter;

  if (hasActiveFilters) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
        <SearchOffIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {t('noAttendancesMatchFilters')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('tryAdjustingFilters')}
        </Typography>
        <Button
          variant="outlined"
          startIcon={isRTL ? null : <ClearIcon />}
          endIcon={isRTL ? <ClearIcon /> : null}
          onClick={onClearFilters}
          sx={{ mr: 2 }}
        >
          {t('clearFilters')}
        </Button>
        <Button
          variant="contained"
          startIcon={isRTL ? null : <AddIcon />}
          endIcon={isRTL ? <AddIcon /> : null}
          onClick={onCreateClick}
        >
          {t('createFirstAttendance')}
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('noAttendancesYet')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('startManagingAttendance')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="large"
        startIcon={isRTL ? null : <AddIcon />}
        endIcon={isRTL ? <AddIcon /> : null}
        onClick={onCreateClick}
        sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
      >
        {t('createFirstAttendance')}
      </Button>
    </Paper>
  );
};

export default EmptyState;
