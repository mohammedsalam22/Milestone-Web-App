import React from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const PlacementDatesHeader = ({ filters, setFilters, onCreateNew }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      mb: 4,
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: { xs: 'stretch', md: 'center' },
      justifyContent: 'space-between',
      gap: 3
    }}>
      {/* Title Section */}
      <Typography variant="h4" component="h1">
        {t('placementDates')}
      </Typography>

      {/* Filters and Actions */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2
      }}>
        {/* Filters */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
          sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}
        >
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>{t('timeFilter')}</InputLabel>
            <Select
              value={filters.future}
              label={t('timeFilter')}
              onChange={(e) => handleFilterChange('future', e.target.value)}
              startAdornment={<FilterIcon sx={{ mr: 1, color: 'text.secondary' }} />}
            >
              <MenuItem value={1}>{t('upcomingTests')}</MenuItem>
              <MenuItem value={0}>{t('allTests')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>{t('availability')}</InputLabel>
            <Select
              value={filters.limit_reached}
              label={t('availability')}
              onChange={(e) => handleFilterChange('limit_reached', e.target.value)}
            >
              <MenuItem value={0}>{t('available')}</MenuItem>
              <MenuItem value={1}>{t('fullCapacity')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Create Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateNew}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
            }
          }}
        >
          {t('scheduleNewTest')}
        </Button>
      </Box>
    </Box>
  );
};

export default PlacementDatesHeader; 