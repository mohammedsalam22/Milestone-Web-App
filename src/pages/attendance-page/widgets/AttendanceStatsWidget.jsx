import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  Warning as ExcusedIcon,
  Group as TotalIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const AttendanceStatsWidget = ({ attendances, date }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const stats = {
    total: attendances.length,
    present: attendances.filter(a => !a.absent).length,
    absent: attendances.filter(a => a.absent && !a.excused).length,
    excused: attendances.filter(a => a.absent && a.excused).length,
  };

  const getPercentage = (value) => {
    return stats.total > 0 ? Math.round((value / stats.total) * 100) : 0;
  };

  const statItems = [
    {
      title: t('totalStudents'),
      value: stats.total,
      icon: <TotalIcon />,
      color: theme.palette.primary.main,
      bgColor: theme.palette.primary.light + '20',
    },
    {
      title: t('present'),
      value: stats.present,
      icon: <PresentIcon />,
      color: theme.palette.success.main,
      bgColor: theme.palette.success.light + '20',
      percentage: getPercentage(stats.present),
    },
    {
      title: t('absent'),
      value: stats.absent,
      icon: <AbsentIcon />,
      color: theme.palette.error.main,
      bgColor: theme.palette.error.light + '20',
      percentage: getPercentage(stats.absent),
    },
    {
      title: t('excused'),
      value: stats.excused,
      icon: <ExcusedIcon />,
      color: theme.palette.warning.main,
      bgColor: theme.palette.warning.light + '20',
      percentage: getPercentage(stats.excused),
    },
  ];

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: theme.shadows[2] }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('attendanceStats')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date ? `${t('for')} ${new Date(date).toLocaleDateString()}` : t('allTime')}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {statItems.map((item, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: 2,
              borderRadius: 2,
              bgcolor: item.bgColor,
            }}>
              <Avatar sx={{
                bgcolor: item.color,
                color: 'white',
                width: 48,
                height: 48,
                mb: 1,
              }}>
                {item.icon}
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {item.title}
              </Typography>
              {item.percentage !== undefined && (
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {item.percentage}%
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default AttendanceStatsWidget;
