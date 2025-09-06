import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress, Alert, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import {
  fetchAllSchedules,
  fetchSections,
  fetchSchedulesBySection,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  setSelectedSection,
  clearSelectedSection,
  clearError,
} from '../../featuers/schedule-slice/scheduleSlice';

import SectionSelector from './components/SectionSelector';
import ScheduleGrid from './components/ScheduleGrid';
import PeriodDialog from './components/PeriodDialog';
import ScheduleHeader from './components/ScheduleHeader';



const Schedule = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const { sections, selectedSection, selectedSectionSchedules, loading, sectionsLoading, error, allSchedules } = useSelector(
    (state) => state.schedule
  );



  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [dialogData, setDialogData] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  // Fetch sections and schedules on component mount
  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchAllSchedules());
  }, [dispatch]);

  // No need for local schedule management since we're working with individual schedule items

  const handleSectionChange = (section) => {
    dispatch(setSelectedSection(section));
    if (section) {
      dispatch(fetchSchedulesBySection(section.id));
    }
  };

  const handleRefresh = () => {
    dispatch(fetchSections());
    dispatch(fetchAllSchedules());
    if (selectedSection) {
      dispatch(fetchSchedulesBySection(selectedSection.id));
    }
  };

  const handleSave = async () => {
    // This will be handled by individual schedule operations
  };

  const handleAddPeriod = (day, startTime, endTime) => {
    setDialogMode('add');
    setDialogData({ 
      day, 
      startTime, 
      endTime, 
      section_id: selectedSection?.id 
    });
    setDialogOpen(true);
  };

  const handleEditPeriod = (schedule) => {
    setDialogMode('edit');
    setDialogData({ schedule });
    setDialogOpen(true);
  };

  const handleDeletePeriod = (schedule) => {
    console.log('Delete period called with schedule:', schedule);
    setScheduleToDelete(schedule);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteSchedule(scheduleToDelete.id)).unwrap();
      // Refresh the section schedules after deleting
      if (selectedSection) {
        dispatch(fetchSchedulesBySection(selectedSection.id));
      }
      setDeleteDialogOpen(false);
      setScheduleToDelete(null);
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      // The error will be automatically displayed in the UI via Redux state
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setScheduleToDelete(null);
  };

  const handleSavePeriod = async (periodData) => {
    try {
      console.log('handleSavePeriod called with:', {
        dialogMode,
        periodData,
        dialogData
      });
      
      if (dialogMode === 'add') {
        // For creating new schedule, validate all required fields
        const requiredFields = ['teacher_id', 'section_id', 'day', 'start_time', 'end_time'];
        const missingFields = requiredFields.filter(field => !periodData[field]);
        
        if (missingFields.length > 0) {
          console.error('Missing required fields:', missingFields);
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
        
        // Ensure IDs are numbers for create
        const validatedData = {
          ...periodData,
          teacher_id: parseInt(periodData.teacher_id),
          section_id: parseInt(periodData.section_id)
        };
        
        console.log('Creating new schedule with data:', validatedData);
        await dispatch(createSchedule(validatedData)).unwrap();
        // Refresh the section schedules after creating
        if (selectedSection) {
          dispatch(fetchSchedulesBySection(selectedSection.id));
        }
      } else if (dialogMode === 'edit') {
        // PeriodDialog already sends only teacher_id, start_time, end_time for edit mode
        const updateData = {
          teacher_id: parseInt(periodData.teacher_id),
          start_time: periodData.start_time,
          end_time: periodData.end_time
        };
        
        console.log('Updating schedule with ID:', dialogData.schedule.id, 'and data:', updateData);
        await dispatch(updateSchedule({ scheduleId: dialogData.schedule.id, scheduleData: updateData })).unwrap();
        // Refresh the section schedules after updating
        if (selectedSection) {
          dispatch(fetchSchedulesBySection(selectedSection.id));
        }
      }
      setDialogOpen(false);
      setDialogData({});
    } catch (error) {
      console.error('Failed to save schedule:', error);
      // The error will be automatically displayed in the UI via Redux state
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogData({});
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  return (
    <Box sx={{
       padding: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
       minHeight: '100vh',
     }}>
      {/* Page Header with Section Selector */}
      <Box sx={{ 
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" component="h1">
          Schedule
        </Typography>
        
        <SectionSelector
          sections={sections}
          selectedSection={selectedSection}
          onSectionChange={handleSectionChange}
          loading={sectionsLoading}
          error={error}
        />
      </Box>

             {/* Error Alert */}
       {error && (
         <Alert severity="error" onClose={handleCloseError} sx={{ mb: 3 }}>
           <Typography variant="body2" sx={{ fontWeight: 500 }}>
             Error: {error}
           </Typography>
           <Typography variant="caption" color="inherit" sx={{ opacity: 0.8 }}>
             Please check the console for more details.
           </Typography>
         </Alert>
       )}

      {/* Main Content */}
      {selectedSection && (
        <Box sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: theme.shadows[1],
          overflow: 'hidden',
          border: `1px solid ${theme.palette.divider}`
        }}>
          <ScheduleHeader
            selectedSection={selectedSection}
            onSave={handleSave}
            onRefresh={handleRefresh}
            loading={loading}
            error={error}
            onCloseError={handleCloseError}
            hasChanges={false}
          />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
              <CircularProgress size={40} />
            </Box>
          ) : (
            <ScheduleGrid
              schedules={selectedSectionSchedules}
              selectedSection={selectedSection}
              onAddPeriod={handleAddPeriod}
              onEditPeriod={handleEditPeriod}
              onDeletePeriod={handleDeletePeriod}
            />
          )}
        </Box>
      )}

      {/* Empty States */}
      {!selectedSection && sections?.length > 0 && !sectionsLoading && (
        <Box sx={{ 
          mt: 6, 
          textAlign: 'center',
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          p: 8,
          boxShadow: theme.shadows[1],
          border: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h5" color="textSecondary" gutterBottom sx={{ fontWeight: 500 }}>
            Select a Section
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ opacity: 0.8 }}>
            Choose a section from the dropdown above to view and manage its schedule
          </Typography>
        </Box>
      )}

      {!sections?.length && !sectionsLoading && !loading && (
        <Box sx={{ 
          mt: 6, 
          textAlign: 'center',
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          p: 8,
          boxShadow: theme.shadows[1],
          border: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h5" color="textSecondary" gutterBottom sx={{ fontWeight: 500 }}>
            No Sections Available
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ opacity: 0.8 }}>
            No sections are currently available. Please check your API connection or create sections first.
          </Typography>
        </Box>
      )}

             {/* Period Dialog */}
       <PeriodDialog
         open={dialogOpen}
         onClose={handleCloseDialog}
         onSave={handleSavePeriod}
         schedule={dialogData.schedule}
         day={dialogData.day}
         startTime={dialogData.startTime}
         endTime={dialogData.endTime}
         sectionId={dialogData.section_id}
         mode={dialogMode}
       />

       {/* Delete Confirmation Dialog */}
       <Dialog open={deleteDialogOpen} onClose={handleCancelDelete} maxWidth="sm" fullWidth>
         <DialogTitle sx={{ 
           backgroundColor: theme.palette.error.light,
           color: theme.palette.error.contrastText
         }}>
           Delete Schedule Period
         </DialogTitle>
         <DialogContent sx={{ pt: 3 }}>
           <Typography variant="body1" gutterBottom>
             Are you sure you want to delete this schedule period?
           </Typography>
                       {scheduleToDelete && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.grey[50], borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {scheduleToDelete.teacher?.subjects?.[0]?.name || 'No Subject'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {scheduleToDelete.teacher?.username || scheduleToDelete.teacher?.user?.username || 'Unknown Teacher'} • Section {scheduleToDelete.section?.name || 'Unknown'}
                </Typography>
                <Typography variant="caption" display="block" color="textSecondary">
                  {scheduleToDelete.day} • {scheduleToDelete.start_time || '00:00:00'} - {scheduleToDelete.end_time || '00:00:00'}
                </Typography>
                {/* Debug info */}
                <Box sx={{ mt: 1, p: 1, backgroundColor: theme.palette.grey[100], borderRadius: 0.5, fontSize: '10px' }}>
                  <Typography variant="caption" color="textSecondary">
                    Debug: Teacher ID: {scheduleToDelete.teacher?.id}, Section ID: {scheduleToDelete.section?.id}
                  </Typography>
                </Box>
              </Box>
            )}
           <Typography variant="body2" color="error" sx={{ mt: 2 }}>
             This action cannot be undone.
      </Typography>
         </DialogContent>
         <DialogActions sx={{ p: 3 }}>
           <Button onClick={handleCancelDelete} color="inherit">
             Cancel
           </Button>
           <Button
             onClick={handleConfirmDelete}
             variant="contained"
             color="error"
           >
             Delete
           </Button>
         </DialogActions>
       </Dialog>
    </Box>
  );
};

export default Schedule;