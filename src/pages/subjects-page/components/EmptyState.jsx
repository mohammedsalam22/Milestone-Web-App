import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const EmptyState = ({
  searchTerm,
  gradeFilter,
  onCreateClick,
  onClearFilters,
  isRTL,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      textAlign: 'center'
    }}>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
        {searchTerm || gradeFilter !== 'all' ? t('noSubjectsFound') : t('noSubjectsYet')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {searchTerm || gradeFilter !== 'all' ? t('tryDifferentFilters') : t('createYourFirstSubject')}
      </Typography>
      {(searchTerm || gradeFilter !== 'all') && (
        <Button
          variant="outlined"
          onClick={onClearFilters}
          sx={{ mb: 2, borderRadius: 2 }}
        >
          {t('clearFilters')}
        </Button>
      )}
      <Button
        variant="outlined"
        startIcon={isRTL ? null : <AddIcon />}
        endIcon={isRTL ? <AddIcon /> : null}
        onClick={onCreateClick}
        sx={{ borderRadius: 2 }}
      >
        {t('createSubject')}
      </Button>
    </Box>
  );
};

export default EmptyState; 