import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const VisitRequestCard = ({ visit }) => {
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
        border: isPastDate(visit.visit_date) ? `2px solid ${theme.palette.error.main}` : 'none',
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {t('visitRequest')}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            {visit.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PhoneIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
          <Typography variant="body1" color="text.secondary">
            {visit.phone}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
          <Typography variant="body1" color="text.secondary">
            {formatDate(visit.visit_date)} at {formatTime(visit.visit_date)}
          </Typography>
        </Box>

        {isPastDate(visit.visit_date) && (
          <Chip
            label={t('pastDate')}
            color="error"
            size="small"
            sx={{ alignSelf: 'flex-start', mb: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default VisitRequestCard; 