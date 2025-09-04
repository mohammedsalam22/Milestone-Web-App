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
  Grade as GradeIcon,
  Class as ClassIcon,
  Book as BookIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SchoolStructureFilters = ({
  selectedFilters,
  onFilterChange,
  studyStages,
  gradesByStudyStage,
  sectionsByGrade,
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
        {/* Study Stage Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="study-stage-label">{t('Study Stage')}</InputLabel>
            <Select
              labelId="study-stage-label"
              value={selectedFilters.study_stage}
              label={t('Study Stage')}
              onChange={(e) => onFilterChange('study_stage', e.target.value)}
              startAdornment={<SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              disabled={disabled}
            >
              <MenuItem value="">
                <em>{t('Select Study Stage')}</em>
              </MenuItem>
              {studyStages.map((stage) => (
                <MenuItem key={stage.id} value={stage.id}>
                  {stage.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Grade Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="grade-label">{t('Grade')}</InputLabel>
            <Select
              labelId="grade-label"
              value={selectedFilters.grade}
              label={t('Grade')}
              onChange={(e) => onFilterChange('grade', e.target.value)}
              startAdornment={<GradeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              disabled={!selectedFilters.study_stage || disabled}
            >
              <MenuItem value="">
                <em>{t('Select Grade')}</em>
              </MenuItem>
              {gradesByStudyStage.map((grade) => (
                <MenuItem key={grade.id} value={grade.id}>
                  {grade.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Section Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="section-label">{t('Section')}</InputLabel>
            <Select
              labelId="section-label"
              value={selectedFilters.section}
              label={t('Section')}
              onChange={(e) => onFilterChange('section', e.target.value)}
              startAdornment={<ClassIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              disabled={!selectedFilters.grade || disabled}
            >
              <MenuItem value="">
                <em>{t('Select Section')}</em>
              </MenuItem>
              {sectionsByGrade.map((section) => (
                <MenuItem key={section.id} value={section.id}>
                  {section.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Subject Filter */}
        <Grid item xs={12} sm={6} md={3}>
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
        <Grid item xs={12} sm={6} md={3}>
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

export default SchoolStructureFilters;
