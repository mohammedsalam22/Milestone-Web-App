import React from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
} from '@mui/material';
import {
  School as SchoolIcon,
  Book as BookIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const PerformanceStructureFilters = ({
  selectedFilters,
  onFilterChange,
  onStructureClick,
  getSelectedPath,
  subjectsByGrade,
  markTypes,
  onSearch,
  isSearchValid,
  isRTL,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 0,
        mb: 3,
        backgroundColor: 'transparent',
      }}
    >
      <Grid container spacing={3}>
        {/* School Structure Button */}
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onStructureClick}
            disabled={disabled}
            sx={{
              height: 56,
              justifyContent: 'flex-start',
              textAlign: 'left',
              textTransform: 'none',
              borderStyle: 'dashed',
              borderWidth: 2,
              '&:hover': {
                borderStyle: 'solid',
                borderWidth: 2,
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <SchoolIcon color="primary" />
              <Typography variant="body1" color="text.primary" sx={{ flex: 1, textAlign: 'left' }}>
                {getSelectedPath()}
              </Typography>
            </Box>
          </Button>
        </Grid>

        {/* Subject Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="subject-label">{t('Subject')}</InputLabel>
            <Select
              labelId="subject-label"
              value={selectedFilters.subject}
              label={t('Subject')}
              onChange={(e) => onFilterChange('subject', e.target.value)}
              startAdornment={<BookIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              disabled={!selectedFilters.grade || disabled}
            >
              <MenuItem value="">
                <em>{t('Select Subject')}</em>
              </MenuItem>
              {subjectsByGrade.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {subject.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {subject.grade.name}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Exam Type Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="mark-type-label">{t('Exam Type')}</InputLabel>
            <Select
              labelId="mark-type-label"
              value={selectedFilters.mark_type}
              label={t('Exam Type')}
              onChange={(e) => onFilterChange('mark_type', e.target.value)}
              disabled={disabled}
            >
              <MenuItem value="">
                <em>{t('Select Exam Type')}</em>
              </MenuItem>
              {markTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Search Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={onSearch}
              disabled={!isSearchValid || disabled}
              sx={{
                minWidth: 200,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                '&:disabled': {
                  backgroundColor: theme.palette.grey[300],
                  color: theme.palette.grey[500],
                },
              }}
            >
              {t('Search Marks')}
            </Button>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default PerformanceStructureFilters;
