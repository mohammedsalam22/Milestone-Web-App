import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const VisitDateCard = ({ visitDate, onEdit, onDelete, deleteLoading }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t } = useTranslation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isPastDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return date < now;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'dark' ? 8 : 4,
        },
        border: isPastDate(visitDate.date) ? `2px solid ${theme.palette.error.main}` : 'none',
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {t('visitDate')}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            {formatDate(visitDate.date)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TimeIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
          <Typography variant="body1" color="text.secondary">
            {formatTime(visitDate.date)}
          </Typography>
        </Box>

        {isPastDate(visitDate.date) && (
          <Chip
            label={t('pastDate')}
            color="error"
            size="small"
            sx={{ alignSelf: 'flex-start', mb: 2 }}
          />
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Box>
          <IconButton
            size="small"
            onClick={() => onEdit(visitDate)}
            sx={{ color: theme.palette.primary.main }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(visitDate)}
            disabled={deleteLoading}
            sx={{ color: theme.palette.error.main }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default VisitDateCard; 