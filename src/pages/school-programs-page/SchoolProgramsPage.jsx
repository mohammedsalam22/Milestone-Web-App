import React, { useState, useEffect } from 'react';
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
  School as SchoolIcon,
} from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { fetchPrograms, deleteProgram, clearError } from '../../featuers/programs-slice/programsSlice';
import CreateEditProgramDialog from './components/CreateEditProgramDialog';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import EmptyState from './components/EmptyState';
import ProgramCard from './components/ProgramCard';

const SchoolProgramsPage = () => {
  const dispatch = useDispatch();
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const { programs, loading, error, deleteLoading } = useSelector((state) => state.programs);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);


  const isRTL = (language) => ['ar'].includes(language);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleCreateProgram = () => {
    setSelectedProgram(null);
    setCreateDialogOpen(true);
  };

  const handleEditProgram = (program) => {
    setSelectedProgram(program);
    setEditDialogOpen(true);
  };

  const handleDeleteProgram = (program) => {
    setSelectedProgram(program);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProgram) {
      await dispatch(deleteProgram(selectedProgram.id));
      setDeleteDialogOpen(false);
      setSelectedProgram(null);
    }
  };



  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3, direction: isRTL(i18n.language) ? 'rtl' : 'ltr' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('schoolPrograms')}
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Programs Grid */}
      {programs.length === 0 ? (
        <EmptyState onCreateProgram={handleCreateProgram} />
      ) : (
        <Grid container spacing={3}>
          {programs.map((program) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={program.id}>
              <ProgramCard
                program={program}
                onEdit={handleEditProgram}
                onDelete={handleDeleteProgram}
                deleteLoading={deleteLoading}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add program"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: isRTL(i18n.language) ? 'auto' : 16,
          left: isRTL(i18n.language) ? 16 : 'auto',
        }}
        onClick={handleCreateProgram}
      >
        <AddIcon />
      </Fab>

      {/* Create/Edit Dialog */}
      <CreateEditProgramDialog
        open={createDialogOpen || editDialogOpen}
        onClose={() => {
          setCreateDialogOpen(false);
          setEditDialogOpen(false);
          setSelectedProgram(null);
        }}
        program={selectedProgram}
        isEdit={editDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedProgram(null);
        }}
        onConfirm={handleConfirmDelete}
        program={selectedProgram}
        loading={deleteLoading}
      />
    </Container>
  );
};

export default SchoolProgramsPage; 