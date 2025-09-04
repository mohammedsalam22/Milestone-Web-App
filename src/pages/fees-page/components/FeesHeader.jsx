import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const FeesHeader = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  installmentFilter,
  setInstallmentFilter,
  sortBy,
  setSortBy,
  onCreateClick,
  isRTL,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      {/* Title and Create Button */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            {t('fees')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {t('manageFeesDescription')}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateClick}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
          }}
        >
          {t('createFee')}
        </Button>
      </Box>

      {/* Filters and Search */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            placeholder={t('searchFees')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>{t('status')}</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label={t('status')}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="all">{t('allStatuses')}</MenuItem>
              <MenuItem value="chosen">{t('chosen')}</MenuItem>
              <MenuItem value="notChosen">{t('notChosen')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>{t('installment')}</InputLabel>
            <Select
              value={installmentFilter}
              onChange={(e) => setInstallmentFilter(e.target.value)}
              label={t('installment')}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="all">{t('allInstallments')}</MenuItem>
              <MenuItem value="available">{t('available')}</MenuItem>
              <MenuItem value="notAvailable">{t('notAvailable')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>{t('sortBy')}</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label={t('sortBy')}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="name">{t('name')}</MenuItem>
              <MenuItem value="symbol">{t('symbol')}</MenuItem>
              <MenuItem value="value">{t('value')}</MenuItem>
              <MenuItem value="status">{t('status')}</MenuItem>
              <MenuItem value="installment">{t('installment')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
              icon={<FilterIcon />}
              label={t('filters')}
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeesHeader;
