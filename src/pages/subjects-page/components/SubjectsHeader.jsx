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

const SubjectsHeader = ({
  searchTerm,
  setSearchTerm,
  gradeFilter,
  setGradeFilter,
  sortBy,
  setSortBy,
  uniqueGrades,
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
        {t('subjects')}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          placeholder={t('searchSubjects')}
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
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>{t('filterByGrade')}</InputLabel>
          <Select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            label={t('filterByGrade')}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">{t('allGrades')}</MenuItem>
            {uniqueGrades.map(grade => (
              <MenuItem key={grade} value={grade}>{grade}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>{t('sortBy')}</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label={t('sortBy')}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="name">{t('sortByName')}</MenuItem>
            <MenuItem value="grade">{t('sortByGrade')}</MenuItem>
            <MenuItem value="teachers">{t('sortByTeachers')}</MenuItem>
          </Select>
        </FormControl>

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
          {t('createSubject')}
        </Button>
      </Box>
    </Box>
  );
};

export default SubjectsHeader; 