import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { fetchVisitDates } from '../../featuers/visit-dates-slice/visitDatesSlice';
import { fetchVisits } from '../../featuers/visits-slice/visitsSlice';
import VisitDatesTab from './components/VisitDatesTab';
import VisitRequestsTab from './components/VisitRequestsTab';

const ParentsVisitsPage = () => {
  const dispatch = useDispatch();
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const { loading: visitDatesLoading, error: visitDatesError, visitDates } = useSelector((state) => state.visitDates);
  const { loading: visitsLoading, error: visitsError, visits } = useSelector((state) => state.visits);

  const [activeTab, setActiveTab] = useState(0);

  const isRTL = (language) => ['ar'].includes(language);

  useEffect(() => {
    dispatch(fetchVisitDates());
    dispatch(fetchVisits());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const loading = visitDatesLoading || visitsLoading;
  const error = visitDatesError || visitsError;

  // Calculate statistics for tab badges
  const totalVisitDates = visitDates?.length || 0;
  const totalVisits = visits?.length || 0;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3, direction: isRTL(i18n.language) ? 'rtl' : 'ltr' }}>
      {/* Enhanced Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2, 
          flexDirection: isRTL(i18n.language) ? 'row-reverse' : 'row',
          gap: 2
        }}>
          <Box sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: '12px',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <PeopleIcon sx={{ fontSize: 28, color: 'white' }} />
          </Box>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              {t('parentsVisits')}
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              {t('manageVisitDates')}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            '& .MuiAlert-icon': {
              fontSize: 24
            }
          }}
        >
          {error}
        </Alert>
      )}

      {/* Enhanced Tabs */}
      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 3, 
          mb: 4,
          overflow: 'hidden'
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="parents visits tabs"
          sx={{
            backgroundColor: theme.palette.background.paper,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              minHeight: 72,
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          <Tab
            icon={<CalendarIcon />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {t('visitDates')}
                <Chip 
                  label={totalVisitDates} 
                  size="small" 
                  sx={{ 
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    fontSize: '0.75rem',
                    height: 20
                  }} 
                />
              </Box>
            }
            iconPosition="start"
            sx={{ flexDirection: 'row', gap: 1 }}
          />
          <Tab
            icon={<PeopleIcon />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {t('visitRequests')}
                <Chip 
                  label={totalVisits} 
                  size="small" 
                  sx={{ 
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                    fontSize: '0.75rem',
                    height: 20
                  }} 
                />
              </Box>
            }
            iconPosition="start"
            sx={{ flexDirection: 'row', gap: 1 }}
          />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box role="tabpanel" hidden={activeTab !== 0}>
        {activeTab === 0 && <VisitDatesTab />}
      </Box>
      <Box role="tabpanel" hidden={activeTab !== 1}>
        {activeTab === 1 && <VisitRequestsTab />}
      </Box>
    </Container>
  );
};

export default ParentsVisitsPage; 