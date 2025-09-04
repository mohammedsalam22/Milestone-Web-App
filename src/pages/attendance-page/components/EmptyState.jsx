import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  SearchOff as SearchOffIcon,
  Clear as ClearIcon,
  EventNote as EventNoteIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const EmptyState = ({
  searchTerm,
  selectedStudyStage,
  selectedGrade,
  selectedSection,
  dateFilter,
  onCreateClick,
  onClearFilters,
  isRTL,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const hasActiveFilters = searchTerm || selectedStudyStage || selectedGrade || selectedSection || dateFilter;

  if (hasActiveFilters) {
    return (
      <Card sx={{ 
        p: 6, 
        textAlign: 'center', 
        borderRadius: 3,
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
        maxWidth: 600,
        mx: 'auto'
      }}>
        <SearchOffIcon sx={{ 
          fontSize: 80, 
          color: theme.palette.text.secondary, 
          mb: 3,
          opacity: 0.7
        }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          {t('noAttendancesMatchFilters')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
          {t('tryAdjustingFilters')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={isRTL ? null : <ClearIcon />}
            endIcon={isRTL ? <ClearIcon /> : null}
            onClick={onClearFilters}
            sx={{ px: 3, py: 1.5 }}
          >
            {t('clearFilters')}
          </Button>
          <Button
            variant="contained"
            startIcon={isRTL ? null : <AddIcon />}
            endIcon={isRTL ? <AddIcon /> : null}
            onClick={onCreateClick}
            sx={{ px: 3, py: 1.5 }}
          >
            {t('createFirstAttendance')}
          </Button>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      p: 6, 
      textAlign: 'center', 
      borderRadius: 3,
      background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
      border: `1px solid ${theme.palette.divider}`,
      maxWidth: 600,
      mx: 'auto'
    }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          mb: 3,
          boxShadow: theme.shadows[4]
        }}>
          <EventNoteIcon sx={{ fontSize: 60, color: 'white' }} />
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
          {t('noAttendancesYet')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto', lineHeight: 1.6 }}>
          {t('startManagingAttendance')}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 2, 
          mb: 4,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText
          }}>
            <SchoolIcon sx={{ fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {t('trackStudentAttendance')}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        size="large"
        startIcon={isRTL ? null : <AddIcon />}
        endIcon={isRTL ? <AddIcon /> : null}
        onClick={onCreateClick}
        sx={{ 
          px: 5, 
          py: 2, 
          fontSize: '1.1rem',
          fontWeight: 600,
          borderRadius: 3,
          boxShadow: theme.shadows[4],
          '&:hover': {
            boxShadow: theme.shadows[8],
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease'
          }
        }}
      >
        {t('createFirstAttendance')}
      </Button>
    </Card>
  );
};

export default EmptyState;
