import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Alert,
} from '@mui/material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import VisitRequestCard from './VisitRequestCard';
import EmptyState from './EmptyState';

const VisitRequestsTab = () => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const { visits } = useSelector((state) => state.visits);

  const isRTL = (language) => ['ar'].includes(language);

  return (
    <Box>
      {/* Content */}
      {visits.length === 0 ? (
        <EmptyState isVisitRequests={true} />
      ) : (
        <Grid container spacing={3}>
          {visits.map((visit) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={visit.id}>
              <VisitRequestCard visit={visit} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default VisitRequestsTab; 