import React from 'react';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const AttendancesHeader = ({
  searchTerm,
  setSearchTerm,
  selectedStudyStage,
  selectedGrade,
  selectedSection,
  onStructureClick,
  getSelectedPath,
  dateFilter,
  setDateFilter,
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
        <Button
          variant="outlined"
          onClick={onStructureClick}
          sx={{
            height: 40,
            minWidth: 200,
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
            <Typography variant="body2" color="text.primary" sx={{ flex: 1, textAlign: 'left' }}>
              {getSelectedPath()}
            </Typography>
          </Box>
        </Button>
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
