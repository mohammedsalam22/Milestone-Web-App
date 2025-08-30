import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchAttendances, createAttendance, updateAttendance, deleteAttendance } from '../../featuers/attendances-slice/attendancesSlice';
import { fetchSections } from '../../featuers/sections-slice/sectionsSlice';
import { fetchStudents } from '../../featuers/students-slice/studentsSlice';
import {
  AttendancesHeader,
  AttendancesTable,
  EmptyState,
  CreateEditAttendanceDialog,
  DeleteConfirmationDialog,
} from './components';

const AttendancesPage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { attendances, loading, error } = useSelector((state) => state.attendances);
  const { sections } = useSelector((state) => state.sections);
  const { students, loading: studentsLoading } = useSelector((state) => state.students);

  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    dispatch(fetchAttendances());
    dispatch(fetchSections());
    dispatch(fetchStudents());
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setDateFilter(today);
  }, [dispatch]);

  // Ensure students are loaded when needed
  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  const handleCreateClick = () => {
    setCreateDialogOpen(true);
  };

  const handleEditClick = (attendance) => {
    setSelectedAttendance(attendance);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (attendance) => {
    setSelectedAttendance(attendance);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteAttendance(selectedAttendance.id));
      setDeleteDialogOpen(false);
      setSelectedAttendance(null);
    } catch (error) {
      // Error handling is done in the slice
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSectionFilter('all');
    const today = new Date().toISOString().split('T')[0];
    setDateFilter(today);
  };

  // Filter and search attendances
  const filteredAttendances = attendances.filter(attendance => {
    const matchesSearch = 
      attendance.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.note.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Section filtering: check if student belongs to the selected section
    const matchesSection = sectionFilter === 'all' || 
      students.find(s => s.id === attendance.student_id)?.section?.id === parseInt(sectionFilter);
    
    const matchesDate = !dateFilter || 
      attendance.date === dateFilter;
    
    return matchesSearch && matchesSection && matchesDate;
  });

  if (loading && attendances.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, ...(isRTL && { direction: 'rtl', textAlign: 'right' }) }}>
      {/* Header with Title and Filters */}
      <AttendancesHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sectionFilter={sectionFilter}
        setSectionFilter={setSectionFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        sections={sections}
        onCreateClick={handleCreateClick}
        isRTL={isRTL}
      />

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Attendances Table or Empty State */}
      {filteredAttendances.length === 0 ? (
        <EmptyState
          searchTerm={searchTerm}
          sectionFilter={sectionFilter}
          dateFilter={dateFilter}
          onCreateClick={handleCreateClick}
          onClearFilters={handleClearFilters}
          isRTL={isRTL}
        />
      ) : (
        <AttendancesTable
          attendances={filteredAttendances}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          students={students}
          sections={sections}
        />
      )}

      {/* Dialogs */}
      <CreateEditAttendanceDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        isEditMode={false}
        attendance={null}
        sections={sections}
        studentsLoading={studentsLoading}
      />

      <CreateEditAttendanceDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        isEditMode={true}
        attendance={selectedAttendance}
        sections={sections}
        studentsLoading={studentsLoading}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        selectedAttendance={selectedAttendance}
        loading={loading}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default AttendancesPage;
