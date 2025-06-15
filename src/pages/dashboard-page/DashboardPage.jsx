import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Container,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from '@mui/icons-material';
import DashboardStats from './components/DashboardStats';
import RecentActivity from './components/RecentActivity';
import { useTheme } from '../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const isRTL = (language) => ['ar'].includes(language);

  return (
    <Container maxWidth="xl" sx={{ py: 3, direction: isRTL(i18n.language) ? 'rtl' : 'ltr' }}>
      {/* Header Section */}
      <Box sx={{ mb: 5, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 1,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('welcomeBack')}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 400,
            maxWidth: '600px',
          }}
        >
          {t('hereIsWhatIsHappening')}
        </Typography>
      </Box>

      {/* Stats Section */}
      <DashboardStats />

      {/* Main Content Grid */}
      <Grid container spacing={4} sx={{ mb: 5 }}>
        <Grid item xs={12} lg={8}>
          <RecentActivity />
        </Grid>
      </Grid>

      {/* Additional Info Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              color: 'white',
              p: 4,
              borderRadius: 3,
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              textAlign: isRTL(i18n.language) ? 'right' : 'left',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: isRTL(i18n.language) ? 'auto' : 0,
                left: isRTL(i18n.language) ? 0 : 'auto',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                transform: isRTL(i18n.language) ? 'translate(-30px, -30px)' : 'translate(30px, -30px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, position: 'relative', zIndex: 1, flexDirection: isRTL(i18n.language) ? 'row-reverse' : 'row' }}>
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  p: 1.5,
                  mr: isRTL(i18n.language) ? 0 : 2,
                  ml: isRTL(i18n.language) ? 2 : 0,
                }}
              >
                <TrendingUpIcon sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                {t('quickActions')}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
              {t('accessFrequentlyUsedTools')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translateY(-2px)',
                },
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {t('viewAll')} →
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              background: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)',
              color: 'white',
              p: 4,
              borderRadius: 3,
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              textAlign: isRTL(i18n.language) ? 'right' : 'left',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: isRTL(i18n.language) ? 'auto' : 0,
                left: isRTL(i18n.language) ? 0 : 'auto',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                transform: isRTL(i18n.language) ? 'translate(-30px, -30px)' : 'translate(30px, -30px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, position: 'relative', zIndex: 1, flexDirection: isRTL(i18n.language) ? 'row-reverse' : 'row' }}>
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  p: 1.5,
                  mr: isRTL(i18n.language) ? 0 : 2,
                  ml: isRTL(i18n.language) ? 2 : 0,
                }}
              >
                <SecurityIcon sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                {t('systemHealth')}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
              {t('allSystemsOperational')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1, flexDirection: isRTL(i18n.language) ? 'row-reverse' : 'row' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#4caf50',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.7, transform: 'scale(1.1)' },
                    '100%': { opacity: 1, transform: 'scale(1)' },
                  },
                  mr: isRTL(i18n.language) ? 0 : 'auto',
                  ml: isRTL(i18n.language) ? 'auto' : 0,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                {t('online')}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              background: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%)',
              color: 'white',
              p: 4,
              borderRadius: 3,
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              textAlign: isRTL(i18n.language) ? 'right' : 'left',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: isRTL(i18n.language) ? 'auto' : 0,
                left: isRTL(i18n.language) ? 0 : 'auto',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                transform: isRTL(i18n.language) ? 'translate(-30px, -30px)' : 'translate(30px, -30px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, position: 'relative', zIndex: 1, flexDirection: isRTL(i18n.language) ? 'row-reverse' : 'row' }}>
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  p: 1.5,
                  mr: isRTL(i18n.language) ? 0 : 2,
                  ml: isRTL(i18n.language) ? 2 : 0,
                }}
              >
                <SupportIcon sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                {t('helpAndSupport')}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
              {t('needAssistance')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translateY(-2px)',
                },
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {t('contactUs')} →
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;