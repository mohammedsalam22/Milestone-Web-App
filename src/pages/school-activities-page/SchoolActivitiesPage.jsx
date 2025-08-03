import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Container,
  Fab,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  SportsEsports as SportsEsportsIcon,
} from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { fetchActivities, deleteActivity, clearError } from '../../featuers/activities-slice/activitiesSlice';
import CreateEditActivityDialog from './components/CreateEditActivityDialog';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import EmptyState from './components/EmptyState';
import ActivityCard from './components/ActivityCard';

const SchoolActivitiesPage = () => {
  const dispatch = useDispatch();
  const { activities, loading, error, deleteLoading } = useSelector((state) => state.activities);
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const [createEditDialogOpen, setCreateEditDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const isRTL = (language) => ['ar'].includes(language);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleCreateActivity = () => {
    setIsEditMode(false);
    setSelectedActivity(null);
    setCreateEditDialogOpen(true);
  };

  const handleEditActivity = (activity) => {
    setIsEditMode(true);
    setSelectedActivity(activity);
    setCreateEditDialogOpen(true);
  };

  const handleDeleteActivity = (activity) => {
    setSelectedActivity(activity);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedActivity) {
      await dispatch(deleteActivity(selectedActivity.id));
      setDeleteDialogOpen(false);
      setSelectedActivity(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3, direction: isRTL(i18n.language) ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('schoolActivities')}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 400,
            maxWidth: '600px',
          }}
        >
          {t('manageSchoolActivities')}
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Content */}
      {activities.length === 0 ? (
        <EmptyState onCreateActivity={handleCreateActivity} />
      ) : (
        <Grid container spacing={3}>
          {activities.map((activity) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={activity.id}>
              <ActivityCard
                activity={activity}
                onEdit={handleEditActivity}
                onDelete={handleDeleteActivity}
                deleteLoading={deleteLoading}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add activity"
        onClick={handleCreateActivity}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: isRTL(i18n.language) ? 'auto' : 24,
          left: isRTL(i18n.language) ? 24 : 'auto',
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Dialogs */}
      <CreateEditActivityDialog
        open={createEditDialogOpen}
        onClose={() => setCreateEditDialogOpen(false)}
        activity={selectedActivity}
        isEdit={isEditMode}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        activity={selectedActivity}
        loading={deleteLoading}
      />
    </Container>
  );
};

export default SchoolActivitiesPage; 