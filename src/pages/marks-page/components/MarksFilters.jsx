import React from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  Grade as GradeIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const MarksFilters = ({
  selectedFilters,
  onFilterChange,
  teacherSubjects,
  teacherGrades,
  sectionsByGrade,
  markTypes,
  onSearch,
  isSearchValid,
  isRTL,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AssignmentIcon sx={{ color: theme.palette.primary.main }} />
        <Typography variant="h6" fontWeight="medium">
          {t('Filter Options')}
        </Typography>
      </Box>

                                                       <Grid container spacing={3}>
           {/* Subject Filter */}
           <Grid item xs={12} sm={6} md={2.5}>
             <FormControl fullWidth>
               <InputLabel id="subject-label">{t('Subject')}</InputLabel>
                            <Select
               labelId="subject-label"
               value={selectedFilters.subject}
               label={t('Subject')}
               onChange={(e) => onFilterChange('subject', e.target.value)}
               startAdornment={<SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />}
               disabled={disabled}
             >
                 <MenuItem value="">
                   <em>{t('Select Subject')}</em>
                 </MenuItem>
                                {teacherSubjects.map((subject) => (
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

           {/* Grade Filter */}
           <Grid item xs={12} sm={6} md={2.5}>
             <FormControl fullWidth>
               <InputLabel id="grade-label">{t('Grade')} (Auto)</InputLabel>
               <Select
                 labelId="grade-label"
                 value={selectedFilters.grade}
                 label={t('Grade') + ' (Auto)'}
                 onChange={(e) => onFilterChange('grade', e.target.value)}
                 startAdornment={<GradeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                 disabled={!selectedFilters.subject || disabled}
                 sx={{
                   '& .MuiSelect-select': {
                     backgroundColor: selectedFilters.subject ? theme.palette.success.light + '20' : 'inherit',
                   }
                 }}
               >
                 <MenuItem value="">
                   <em>{t('Auto-selected')}</em>
                 </MenuItem>
                 {selectedFilters.subject && (
                   <MenuItem value={teacherSubjects.find(s => s.id === parseInt(selectedFilters.subject))?.grade.id}>
                     <Box>
                       <Typography variant="body1" fontWeight="medium">
                         {teacherSubjects.find(s => s.id === parseInt(selectedFilters.subject))?.grade.name}
                       </Typography>
                       <Typography variant="caption" color="success.main">
                         {t('Auto-selected')}
                       </Typography>
                     </Box>
                   </MenuItem>
                 )}
               </Select>
             </FormControl>
           </Grid>

                    {/* Section Filter */}
            <Grid item xs={12} sm={6} md={3.5}>
              <FormControl fullWidth>
                <InputLabel id="section-label">{t('Section')}</InputLabel>
                                 <Select
                   labelId="section-label"
                   value={selectedFilters.section}
                   label={t('Section')}
                   onChange={(e) => onFilterChange('section', e.target.value)}
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

            {/* Mark Type Filter */}
            <Grid item xs={12} sm={6} md={3.5}>
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

             {/* Instructions */}
       <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.info.light, borderRadius: 1 }}>
         <Typography variant="body2" color="info.contrastText">
           <strong>{t('Instructions')}:</strong> {t('Select a subject (grade will be automatically set), then choose a section and exam type to view student marks. Students without marks will show a mark of 0.')}
         </Typography>
       </Box>
    </Paper>
  );
};

export default MarksFilters;
