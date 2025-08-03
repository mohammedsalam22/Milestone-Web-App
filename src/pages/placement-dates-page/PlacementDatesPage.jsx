import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { 
  fetchPlacementDates, 
  createPlacementDate, 
  updatePlacementDate, 
  deletePlacementDate,
  clearError 
} from '../../featuers/placement-dates-slice/placementDatesSlice';
import PlacementDatesHeader from './components/PlacementDatesHeader';
import PlacementDateCard from './components/PlacementDateCard';
import CreateEditDialog from './components/CreateEditDialog';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import EmptyState from './components/EmptyState';

const PlacementDatesPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { placementDates, loading, error } = useSelector((state) => state.placementDates);

  const [filters, setFilters] = useState({
    future: 1,
    limit_reached: 0,
  });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlacementDate, setSelectedPlacementDate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchPlacementDates(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleCreatePlacementDate = async (formData) => {
    try {
      await dispatch(createPlacementDate(formData)).unwrap();
      setCreateDialogOpen(false);
      setSuccessMessage(t('placementDateCreatedSuccessfully'));
    } catch (error) {
      console.error('Failed to create placement date:', error);
    }
  };

  const handleEditPlacementDate = async (formData) => {
    try {
      await dispatch(updatePlacementDate({ id: selectedPlacementDate.id, data: formData })).unwrap();
      setEditDialogOpen(false);
      setSelectedPlacementDate(null);
      setSuccessMessage(t('placementDateUpdatedSuccessfully'));
    } catch (error) {
      console.error('Failed to update placement date:', error);
    }
  };

  const handleDeletePlacementDate = async () => {
    try {
      await dispatch(deletePlacementDate(selectedPlacementDate.id)).unwrap();
      setDeleteDialogOpen(false);
      setSelectedPlacementDate(null);
      setSuccessMessage(t('placementDateDeletedSuccessfully'));
    } catch (error) {
      console.error('Failed to delete placement date:', error);
    }
  };

  const handleEdit = (placementDate) => {
    setSelectedPlacementDate(placementDate);
    setEditDialogOpen(true);
  };

  const handleDelete = (placementDate) => {
    setSelectedPlacementDate(placementDate);
    setDeleteDialogOpen(true);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isLimitReached = (placementDate) => {
    // This would need to be implemented based on actual registration data
    // For now, we'll assume it's reached if the date is in the past
    return new Date(placementDate.date) < new Date();
  };

  const filteredPlacementDates = placementDates.filter(date => {
    if (filters.future === 1) {
      return new Date(date.date) > new Date();
    }
    return true;
  });

  if (loading && placementDates.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      padding: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <PlacementDatesHeader 
        filters={filters}
        setFilters={setFilters}
        onCreateNew={() => setCreateDialogOpen(true)}
      />

      {/* Error Display */}
      {error && (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 4 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        </Box>
      )}

      {/* Success Display */}
      {successMessage && (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 4 }}>
          <Alert severity="success" sx={{ borderRadius: 2 }}>
            {successMessage}
          </Alert>
        </Box>
      )}

      {/* Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {filteredPlacementDates.length === 0 ? (
          <EmptyState onCreateNew={() => setCreateDialogOpen(true)} />
        ) : (
          <Grid container spacing={3}>
            {filteredPlacementDates.map((placementDate) => (
              <Grid item xs={12} sm={6} md={4} key={placementDate.id}>
                <PlacementDateCard
                  placementDate={placementDate}
                  onEdit={() => handleEdit(placementDate)}
                  onDelete={() => handleDelete(placementDate)}
                  formatDateTime={formatDateTime}
                  isLimitReached={isLimitReached}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Create Dialog */}
      <CreateEditDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreatePlacementDate}
        title="Create New Placement Test"
        submitButtonText="Create"
        loading={loading}
      />

      {/* Edit Dialog */}
      <CreateEditDialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedPlacementDate(null);
        }}
        onSubmit={handleEditPlacementDate}
        title="Edit Placement Test"
        submitButtonText="Update"
        placementDate={selectedPlacementDate}
        loading={loading}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedPlacementDate(null);
        }}
        onConfirm={handleDeletePlacementDate}
        placementDate={selectedPlacementDate}
        loading={loading}
      />
    </Box>
  );
};

export default PlacementDatesPage; 