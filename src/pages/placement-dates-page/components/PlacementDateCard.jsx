import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const PlacementDateCard = ({ 
  placementDate, 
  onEdit, 
  onDelete, 
  formatDateTime, 
  isLimitReached 
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const getStatusColor = () => {
    const now = new Date();
    const testDate = new Date(placementDate.date);
    
    if (testDate < now) {
      return 'default'; // Past
    } else if (isLimitReached(placementDate)) {
      return 'error'; // Full
    } else {
      return 'success'; // Available
    }
  };

  const getStatusText = () => {
    const now = new Date();
    const testDate = new Date(placementDate.date);
    
    if (testDate < now) {
      return t('completed');
    } else if (isLimitReached(placementDate)) {
      return t('fullCapacity');
    } else {
      return t('available');
    }
  };

  const getDaysUntil = () => {
    const now = new Date();
    const testDate = new Date(placementDate.date);
    const diffTime = testDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return t('past');
    } else if (diffDays === 0) {
      return t('today');
    } else if (diffDays === 1) {
      return t('tomorrow');
    } else {
      return `${diffDays} ${t('days')}`;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: theme.shadows[2],
        transition: 'all 0.3s ease-in-out',
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          boxShadow: theme.shadows[8],
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header with Status */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 2
        }}>
          <Chip
            label={getStatusText()}
            color={getStatusColor()}
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={onEdit}
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light + '20',
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={onDelete}
                sx={{
                  color: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: theme.palette.error.light + '20',
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Date and Time */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {formatDateTime(placementDate.date)}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
            {getDaysUntil()}
          </Typography>
        </Box>

        {/* Capacity Information */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PeopleIcon sx={{ color: theme.palette.info.main, fontSize: 20 }} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {t('capacity')}: {placementDate.limit} {t('students')}
            </Typography>
          </Stack>
        </Box>

        {/* Day of Week */}
        <Box sx={{ mt: 'auto' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ScheduleIcon sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {placementDate.day_name}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlacementDateCard; 