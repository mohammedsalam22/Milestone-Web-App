// /src/components/DashboardStats.js
import {
  Typography,
  Grid,
  Box,
  Paper,
} from '@mui/material';
import {
  People as UsersIcon,
  School as GraduationCapIcon,
  Book as BookOpenIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider'; 

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: UsersIcon,
    },
    {
      title: 'Active Teachers',
      value: '142',
      change: '+3%',
      changeType: 'positive',
      icon: GraduationCapIcon,
    },
    {
      title: 'Average Grade',
      value: '87.3%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUpIcon,
    },
    {
      title: 'Attendance Rate',
      value: '94.2%',
      change: '-1.2%',
      changeType: 'negative',
      icon: TrendingDownIcon,
    },
  ];

  const theme = useTheme().getCurrentTheme(); // Get the current theme

  return (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {stats.map((stat, index) => {
        const iconColor = stat.changeType === 'positive' ? theme.palette.success.main : theme.palette.error.main;

        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.1)',
                },
                bgcolor: theme.palette.background.paper, 
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary, 
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      mb: 1,
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: theme.palette.action.hover, 
                    color: theme.palette.text.primary, 
                    p: 1.5,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <stat.icon sx={{ fontSize: 24, color: iconColor }} />
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {stat.changeType === 'positive' ? (
                  <TrendingUpIcon 
                    sx={{ 
                      fontSize: 16, 
                      color: theme.palette.success.main, 
                    }} 
                  />
                ) : (
                  <TrendingDownIcon 
                    sx={{ 
                      fontSize: 16, 
                      color: theme.palette.error.main, 
                    }} 
                  />
                )}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: stat.changeType === 'positive' ? theme.palette.success.main : theme.palette.error.main,
                    fontWeight: 600,
                    fontSize: '0.8rem',
                  }}
                >
                  {stat.change}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    fontSize: '0.8rem',
                  }}
                >
                  from last month
                </Typography>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DashboardStats;