import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
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
  const theme = useTheme();

  const hasFilters = searchTerm || sectionFilter !== 'all' || dateFilter;

  if (hasFilters) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <SearchOffIcon
          sx={{
            fontSize: 64,
            color: theme.palette.text.secondary,
            mb: 2,
          }}
        />
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {t('noIncidentsFound')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
          {t('noIncidentsMatchFilters')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={onClearFilters}
            sx={{ borderRadius: 2 }}
          >
            {t('clearFilters')}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateClick}
            sx={{ borderRadius: 2 }}
          >
            {t('createFirstIncident')}
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.light + '20',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
        }}
      >
        <AddIcon
          sx={{
            fontSize: 40,
            color: theme.palette.primary.main,
          }}
        />
      </Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
        {t('noIncidentsYet')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
        {t('startManagingIncidents')}
      </Typography>
      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        onClick={onCreateClick}
        sx={{
          borderRadius: 2,
          px: 4,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: theme.shadows[4],
          '&:hover': { boxShadow: theme.shadows[8] }
        }}
      >
        {t('createFirstIncident')}
      </Button>
    </Paper>
  );
};

export default EmptyState;
