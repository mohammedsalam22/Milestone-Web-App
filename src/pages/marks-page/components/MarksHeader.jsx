import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Clear as ClearIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const MarksHeader = ({ onCreateClick, onClearFilters, isAddMode = false, isSearchValid = false }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        p: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <SchoolIcon 
          sx={{ 
            fontSize: 32, 
            color: theme.palette.primary.main 
          }} 
        />
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {t('Performance Management')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isAddMode 
              ? t('Add New Marks') 
              : t('Manage student marks and academic performance')
            }
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={onClearFilters}
          disabled={isAddMode}
          sx={{
            borderColor: theme.palette.grey[400],
            color: theme.palette.grey[700],
            '&:hover': {
              borderColor: theme.palette.grey[600],
              backgroundColor: theme.palette.grey[50],
            },
            '&:disabled': {
              borderColor: theme.palette.grey[300],
              color: theme.palette.grey[500],
            },
          }}
        >
          {t('Clear Filters')}
        </Button>
        {!isAddMode && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateClick}
            disabled={!isSearchValid}
            sx={{
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
            {t('Add New Mark')}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MarksHeader;
