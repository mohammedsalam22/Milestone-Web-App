import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
} from '@mui/material';
import {
  Report as ReportIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const IncidentsStatsWidget = ({ incidents }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t } = useTranslation();

  const getIncidentStats = () => {
    const total = incidents.length;
    const today = new Date().toDateString();
    const todayIncidents = incidents.filter(incident => 
      new Date(incident.date).toDateString() === today
    ).length;
    
    const severityCounts = incidents.reduce((acc, incident) => {
      const lowerTitle = incident.title.toLowerCase();
      if (lowerTitle.includes('تنمر') || lowerTitle.includes('bullying')) {
        acc.critical++;
      } else if (lowerTitle.includes('عنف') || lowerTitle.includes('violence')) {
        acc.warning++;
      } else {
        acc.info++;
      }
      return acc;
    }, { critical: 0, warning: 0, info: 0 });

    return {
      total,
      today: todayIncidents,
      critical: severityCounts.critical,
      warning: severityCounts.warning,
      info: severityCounts.info,
    };
  };

  const stats = getIncidentStats();

  const statCards = [
    {
      title: t('totalIncidents'),
      value: stats.total,
      icon: <ReportIcon />,
      color: theme.palette.primary.main,
      bgColor: theme.palette.primary.light + '20',
    },
    {
      title: t('todayIncidents'),
      value: stats.today,
      icon: <TrendingUpIcon />,
      color: theme.palette.info.main,
      bgColor: theme.palette.info.light + '20',
    },
    {
      title: t('criticalIncidents'),
      value: stats.critical,
      icon: <WarningIcon />,
      color: theme.palette.error.main,
      bgColor: theme.palette.error.light + '20',
    },
    {
      title: t('warningIncidents'),
      value: stats.warning,
      icon: <WarningIcon />,
      color: theme.palette.warning.main,
      bgColor: theme.palette.warning.light + '20',
    },
  ];

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        {t('incidentsOverview')}
      </Typography>

      <Grid container spacing={3}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: stat.bgColor,
                border: `1px solid ${stat.color}30`,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: '50%',
                    backgroundColor: stat.color + '20',
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
              
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: stat.color,
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                }}
              >
                {stat.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Severity Distribution */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          {t('severityDistribution')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label={`${t('critical')}: ${stats.critical}`}
            color="error"
            variant="outlined"
            icon={<WarningIcon />}
          />
          <Chip
            label={`${t('warning')}: ${stats.warning}`}
            color="warning"
            variant="outlined"
            icon={<WarningIcon />}
          />
          <Chip
            label={`${t('info')}: ${stats.info}`}
            color="info"
            variant="outlined"
            icon={<InfoIcon />}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default IncidentsStatsWidget;
