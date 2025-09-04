import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import {
  AttachMoney as FeeIcon,
  Add as AddIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const EmptyState = ({
  searchTerm,
  statusFilter,
  installmentFilter,
  onCreateClick,
  onClearFilters,
  isRTL,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const hasFilters = searchTerm || statusFilter !== 'all' || installmentFilter !== 'all';

  return (
    <Paper
      sx={{
        p: 6,
        textAlign: 'center',
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <FeeIcon
          sx={{
            fontSize: 80,
            color: theme.palette.text.secondary,
            opacity: 0.5,
          }}
        />
      </Box>

      {hasFilters ? (
        <>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
            {t('noFeesFound')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t('noFeesFoundDescription')}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={onClearFilters}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
            }}
          >
            {t('clearFilters')}
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
            {t('noFeesYet')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t('noFeesYetDescription')}
          </Typography>
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
            {t('createFirstFee')}
          </Button>
        </>
      )}
    </Paper>
  );
};

export default EmptyState;
