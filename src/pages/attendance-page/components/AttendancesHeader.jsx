import React from 'react';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const AttendancesHeader = ({
  searchTerm,
  setSearchTerm,
  sectionFilter,
  setSectionFilter,
  dateFilter,
  setDateFilter,
  sections,
  onCreateClick,
  isRTL,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 2,
      flexDirection: isRTL ? 'row-reverse' : 'row'
    }}>
      <Typography variant="h4" component="h1">
        {t('attendances')}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          placeholder={t('searchAttendances')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>{t('filterBySection')}</InputLabel>
          <Select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            label={t('filterBySection')}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">{t('allSections')}</MenuItem>
            {sections.map(section => (
              <MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="date"
          label={t('filterByDate')}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />

        <Button
          variant="contained"
          startIcon={isRTL ? null : <AddIcon />}
          endIcon={isRTL ? <AddIcon /> : null}
          onClick={onCreateClick}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: theme.shadows[4],
            '&:hover': { boxShadow: theme.shadows[8] }
          }}
        >
          {t('dailyAttendance')}
        </Button>
      </Box>
    </Box>
  );
};

export default AttendancesHeader;
