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
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  School as CourseIcon,
  PersonAdd as EnrollmentIcon,
  Grade as GradeIcon,
  Quiz as ExamIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider'; 

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'submitted assignment',
      subject: 'Mathematics - Algebra II',
      time: '2 hours ago',
      type: 'assignment',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 2,
      user: 'Dr. Michael Chen',
      action: 'created new course',
      subject: 'Advanced Physics',
      time: '4 hours ago',
      type: 'course',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 3,
      user: 'Emily Davis',
      action: 'joined class',
      subject: 'English Literature',
      time: '6 hours ago',
      type: 'enrollment',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 4,
      user: 'Prof. James Wilson',
      action: 'graded assignment',
      subject: 'Chemistry Lab Report',
      time: '1 day ago',
      type: 'grade',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 5,
      user: 'Lisa Thompson',
      action: 'scheduled exam',
      subject: 'Biology - Final Exam',
      time: '1 day ago',
      type: 'exam',
      avatar: '/api/placeholder/32/32'
    }
  ];

  const getActivityConfig = (type) => {
    const configs = {
      assignment: { 
        color: '#3b82f6', 
        bgColor: '#dbeafe', 
        icon: AssignmentIcon,
        label: 'Assignment'
      },
      course: { 
        color: '#10b981', 
        bgColor: '#d1fae5', 
        icon: CourseIcon,
        label: 'Course'
      },
      enrollment: { 
        color: '#8b5cf6', 
        bgColor: '#ede9fe', 
        icon: EnrollmentIcon,
        label: 'Enrollment'
      },
      grade: { 
        color: '#f59e0b', 
        bgColor: '#fef3c7', 
        icon: GradeIcon,
        label: 'Grade'
      },
      exam: { 
        color: '#ef4444', 
        bgColor: '#fee2e2', 
        icon: ExamIcon,
        label: 'Exam'
      }
    };
    return configs[type] || configs.assignment;
  };

  const theme = useTheme().getCurrentTheme(); 

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
            Recent Activity
          </Typography>
        } 
        subheader={
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
            Latest updates from your institution
          </Typography>
        }
        sx={{ 
          pb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      />
      <CardContent sx={{ p: 0 }}>
        <Box>
          {activities.map((activity, index) => {
            const config = getActivityConfig(activity.type);
            const IconComponent = config.icon;
            
            return (
              <Box key={activity.id}>
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
                        src={activity.avatar} 
                        alt={activity.user}
                        sx={{ 
                          width: 48, 
                          height: 48,
                          backgroundColor: theme.palette.avatarBg || '#e2e8f0', 
                          color: theme.palette.text.primary, 
                          fontWeight: 600,
                        }}
                      >
                        {activity.user.split(' ').map(n => n[0]).join('')}
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
                          {activity.user}
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
                        {activity.action}{' '}
                        <Typography 
                          component="span" 
                          sx={{ 
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {activity.subject}
                        </Typography>
                      </Typography>
                      
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          fontSize: '0.8rem',
                        }}
                      >
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {index < activities.length - 1 && (
                  <Divider sx={{ ml: 9, backgroundColor: theme.palette.divider }} />
                )}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Paper>
  );
};

export default RecentActivity;