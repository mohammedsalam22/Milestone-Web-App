import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  useTheme,
  Button,
} from '@mui/material';
import {
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  Warning as ExcusedIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const RecentAttendancesWidget = ({ attendances, onViewAll }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getStatusIcon = (absent, excused) => {
    if (!absent) return <PresentIcon color="success" />;
    if (excused) return <ExcusedIcon color="warning" />;
    return <AbsentIcon color="error" />;
  };

  const getStatusColor = (absent, excused) => {
    if (!absent) return 'success';
    if (excused) return 'warning';
    return 'error';
  };

  const getStatusText = (absent, excused) => {
    if (!absent) return t('present');
    if (excused) return t('excused');
    return t('absent');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const recentAttendances = attendances
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: theme.shadows[2] }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          {t('recentAttendances')}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          endIcon={<ArrowIcon />}
          onClick={onViewAll}
        >
          {t('viewAll')}
        </Button>
      </Box>

      {recentAttendances.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            {t('noRecentAttendances')}
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {recentAttendances.map((attendance, index) => (
            <ListItem
              key={`${attendance.student_id}-${attendance.date}`}
              sx={{
                px: 0,
                py: 1.5,
                borderBottom: index < recentAttendances.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ 
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  width: 40,
                  height: 40,
                }}>
                  {attendance.student_name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {attendance.student_name}
                    </Typography>
                    {getStatusIcon(attendance.absent, attendance.excused)}
                    <Chip
                      label={getStatusText(attendance.absent, attendance.excused)}
                      size="small"
                      color={getStatusColor(attendance.absent, attendance.excused)}
                      variant="outlined"
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(attendance.date)}
                    </Typography>
                    {attendance.note && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                        {attendance.note}
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default RecentAttendancesWidget;
