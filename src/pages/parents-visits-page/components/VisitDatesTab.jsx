import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Fab,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { deleteVisitDate, clearError } from '../../../featuers/visit-dates-slice/visitDatesSlice';
import CreateEditVisitDateDialog from './CreateEditVisitDateDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import EmptyState from './EmptyState';
import VisitDateCard from './VisitDateCard';

const VisitDatesTab = () => {
  const dispatch = useDispatch();
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const { visitDates, deleteLoading } = useSelector((state) => state.visitDates);

  const [createEditDialogOpen, setCreateEditDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVisitDate, setSelectedVisitDate] = useState(null);

  const isRTL = (language) => ['ar'].includes(language);

  const handleCreateVisitDate = () => {
    setIsEditMode(false);
    setSelectedVisitDate(null);
    setCreateEditDialogOpen(true);
  };

  const handleEditVisitDate = (visitDate) => {
    setIsEditMode(true);
    setSelectedVisitDate(visitDate);
    setCreateEditDialogOpen(true);
  };

  const handleDeleteVisitDate = (visitDate) => {
    setSelectedVisitDate(visitDate);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedVisitDate) {
      await dispatch(deleteVisitDate(selectedVisitDate.id));
      setDeleteDialogOpen(false);
      setSelectedVisitDate(null);
    }
  };

  return (
    <Box>
      {/* Content */}
      {visitDates.length === 0 ? (
        <EmptyState onCreateVisitDate={handleCreateVisitDate} />
      ) : (
        <Grid container spacing={3}>
          {visitDates.map((visitDate) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={visitDate.id}>
              <VisitDateCard
                visitDate={visitDate}
                onEdit={handleEditVisitDate}
                onDelete={handleDeleteVisitDate}
                deleteLoading={deleteLoading}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add visit date"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: isRTL(i18n.language) ? 'auto' : 24,
          left: isRTL(i18n.language) ? 24 : 'auto',
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        onClick={handleCreateVisitDate}
      >
        <AddIcon />
      </Fab>

      {/* Dialogs */}
      <CreateEditVisitDateDialog
        open={createEditDialogOpen}
        onClose={() => setCreateEditDialogOpen(false)}
        visitDate={selectedVisitDate}
        isEdit={isEditMode}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        visitDate={selectedVisitDate}
        loading={deleteLoading}
      />
    </Box>
  );
};

export default VisitDatesTab; 