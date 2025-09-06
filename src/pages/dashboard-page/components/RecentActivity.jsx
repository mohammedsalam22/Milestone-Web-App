// /src/components/RecentActivity.js
import {
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Box,
  Chip,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Report as ReportIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { 
  fetchDashboardData,
  selectDashboardData,
  selectDashboardLoading,
  selectDashboardError
} from '../../../featuers/dashboard-slice/dashboardSlice'; 

const RecentActivity = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Format date to relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  // Get student names as a string
  const getStudentNames = (studentNames) => {
    if (!studentNames || studentNames.length === 0) return 'Unknown Student';
    return studentNames.map(student => student.name).join(', ');
  };

  const getIncidentConfig = (title) => {
    // Map incident titles to appropriate colors and icons
    const configs = {
      'سوء تصرف': { 
        color: '#ef4444', 
        bgColor: '#fee2e2', 
        icon: WarningIcon,
        label: 'Misbehavior'
      },
      'مشاجرة': { 
        color: '#f59e0b', 
        bgColor: '#fef3c7', 
        icon: ReportIcon,
        label: 'Fight'
      },
      'default': { 
        color: '#6b7280', 
        bgColor: '#f3f4f6', 
        icon: AssignmentIcon,
        label: 'Incident'
      }
    };
    return configs[title] || configs.default;
  };

  const theme = useTheme().getCurrentTheme(); 

  if (loading) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`, 
          overflow: 'hidden',
          bgcolor: theme.palette.background.paper,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`, 
          overflow: 'hidden',
          bgcolor: theme.palette.background.paper,
          p: 4,
        }}
      >
        <Typography color="error">Error loading recent incidents: {error}</Typography>
      </Paper>
    );
  }

  const incidents = dashboardData.latest_events || [];

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`, 
        overflow: 'hidden',
        bgcolor: theme.palette.background.paper, 
      }}
    >
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            Recent Incidents
          </Typography>
        } 
        subheader={
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
            Latest incidents from your institution
          </Typography>
        }
        sx={{ 
          pb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      />
      <CardContent sx={{ p: 0 }}>
        <Box>
          {incidents.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                No recent incidents found
              </Typography>
            </Box>
          ) : (
            incidents.map((incident, index) => {
              const config = getIncidentConfig(incident.title);
              const IconComponent = config.icon;
            
              return (
                <Box key={incident.id}>
                  <Box 
                    sx={{ 
                      p: 3,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover, 
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                      <Box sx={{ position: 'relative' }}>
                        <Avatar 
                          sx={{ 
                            width: 48, 
                            height: 48,
                            backgroundColor: theme.palette.avatarBg || '#e2e8f0', 
                            color: theme.palette.text.primary, 
                            fontWeight: 600,
                          }}
                        >
                          {getStudentNames(incident.student_names).split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </Avatar>
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: -2,
                            right: -2,
                            backgroundColor: config.bgColor,
                            borderRadius: '50%',
                            p: 0.5,
                            border: `2px solid ${theme.palette.background.paper}`, 
                          }}
                        >
                          <IconComponent 
                            sx={{ 
                              fontSize: 14, 
                              color: config.color,
                            }} 
                          />
                        </Box>
                      </Box>
                      
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                            }}
                          >
                            {getStudentNames(incident.student_names)}
                          </Typography>
                          <Chip 
                            label={config.label}
                            size="small"
                            sx={{
                              backgroundColor: config.bgColor,
                              color: config.color,
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.text.secondary,
                            mb: 1,
                            lineHeight: 1.5,
                          }}
                        >
                          <Typography 
                            component="span" 
                            sx={{ 
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                            }}
                          >
                            {incident.title}
                          </Typography>
                          {' - '}
                          {incident.procedure}
                        </Typography>
                        
                        {incident.note && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: theme.palette.text.secondary,
                              mb: 1,
                              fontStyle: 'italic',
                            }}
                          >
                            Note: {incident.note}
                          </Typography>
                        )}
                        
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: theme.palette.text.secondary,
                            fontSize: '0.8rem',
                          }}
                        >
                          {formatRelativeTime(incident.date)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {index < incidents.length - 1 && (
                    <Divider sx={{ ml: 9, backgroundColor: theme.palette.divider }} />
                  )}
                </Box>
              );
            })
          )}
        </Box>
      </CardContent>
    </Paper>
  );
};

export default RecentActivity;