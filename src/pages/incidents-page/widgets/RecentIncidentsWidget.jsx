import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import {
  Report as ReportIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Schedule as ScheduleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const RecentIncidentsWidget = ({ incidents, onViewAll, onIncidentClick }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const getSeverityIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('تنمر') || lowerTitle.includes('bullying')) {
      return <ReportIcon color="error" />;
    } else if (lowerTitle.includes('عنف') || lowerTitle.includes('violence')) {
      return <WarningIcon color="warning" />;
    }
    return <InfoIcon color="info" />;
  };

  const getSeverityColor = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('تنمر') || lowerTitle.includes('bullying')) {
      return 'error';
    } else if (lowerTitle.includes('عنف') || lowerTitle.includes('violence')) {
      return 'warning';
    }
    return 'info';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return t('today');
    } else if (diffDays === 2) {
      return t('yesterday');
    } else if (diffDays <= 7) {
      return `${diffDays - 1} ${t('daysAgo')}`;
    } else {
      return date.toLocaleDateString(i18n.language, {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const recentIncidents = incidents
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recentIncidents.length === 0) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {t('recentIncidents')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('noRecentIncidents')}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('recentIncidents')}
          </Typography>
          <Button
            size="small"
            endIcon={<ArrowForwardIcon />}
            onClick={onViewAll}
            sx={{
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.light + '20',
              },
            }}
          >
            {t('viewAll')}
          </Button>
        </Box>
      </Box>

      {/* Incidents List */}
      <List sx={{ p: 0 }}>
        {recentIncidents.map((incident, index) => (
          <React.Fragment key={incident.id}>
            <ListItem
              sx={{
                px: 3,
                py: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
              onClick={() => onIncidentClick(incident)}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {getSeverityIcon(incident.title)}
              </ListItemIcon>
              
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        flexGrow: 1,
                      }}
                    >
                      {incident.title}
                    </Typography>
                    <Chip
                      label={`${incident.student_names.length} ${t('students')}`}
                      size="small"
                      color={getSeverityColor(incident.title)}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5, lineHeight: 1.4 }}
                    >
                      {incident.note.length > 80 
                        ? `${incident.note.substring(0, 80)}...` 
                        : incident.note
                      }
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ScheduleIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(incident.date)}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            
            {index < recentIncidents.length - 1 && (
              <Divider sx={{ mx: 3 }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default RecentIncidentsWidget;
