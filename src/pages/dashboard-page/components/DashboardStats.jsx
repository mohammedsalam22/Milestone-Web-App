// /src/components/DashboardStats.js
import {
  Typography,
  Grid,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  People as UsersIcon,
  School as GraduationCapIcon,
  AttachMoney as MoneyIcon,
  LocalOffer as DiscountIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
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

const DashboardStats = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Students',
      value: dashboardData.total_students?.toLocaleString() || '0',
      change: '+12%',
      changeType: 'positive',
      icon: UsersIcon,
    },
    {
      title: 'Total Employees',
      value: dashboardData.total_employees?.toLocaleString() || '0',
      change: '+3%',
      changeType: 'positive',
      icon: GraduationCapIcon,
    },
    {
      title: 'Latest Fee',
      value: dashboardData.latest_fee ? `${dashboardData.latest_fee.symbol} - ${dashboardData.latest_fee.name}` : 'No fees',
      change: '',
      changeType: 'neutral',
      icon: MoneyIcon,
    },
    {
      title: 'Latest Discount',
      value: dashboardData.latest_discount ? `${dashboardData.latest_discount.symbol} - ${dashboardData.latest_discount.name}` : 'No discounts',
      change: '',
      changeType: 'neutral',
      icon: DiscountIcon,
    },
  ];

  const theme = useTheme().getCurrentTheme(); // Get the current theme

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography color="error">Error loading dashboard data: {error}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {stats.map((stat, index) => {
        const iconColor = stat.changeType === 'positive' ? theme.palette.success.main : 
                         stat.changeType === 'negative' ? theme.palette.error.main : 
                         theme.palette.primary.main;

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
              
              {stat.change && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {stat.changeType === 'positive' ? (
                    <TrendingUpIcon 
                      sx={{ 
                        fontSize: 16, 
                        color: theme.palette.success.main, 
                      }} 
                    />
                  ) : stat.changeType === 'negative' ? (
                    <TrendingDownIcon 
                      sx={{ 
                        fontSize: 16, 
                        color: theme.palette.error.main, 
                      }} 
                    />
                  ) : null}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: stat.changeType === 'positive' ? theme.palette.success.main : 
                            stat.changeType === 'negative' ? theme.palette.error.main : 
                            theme.palette.text.secondary,
                      fontWeight: 600,
                      fontSize: '0.8rem',
                    }}
                  >
                    {stat.change}
                  </Typography>
                  {stat.changeType !== 'neutral' && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        fontSize: '0.8rem',
                      }}
                    >
                      from last month
                    </Typography>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DashboardStats;