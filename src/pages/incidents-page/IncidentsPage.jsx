import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchIncidents, createIncident, updateIncident, deleteIncident } from '../../featuers/incidents-slice/incidentsSlice';
import { fetchSections } from '../../featuers/sections-slice/sectionsSlice';
import { fetchStudents } from '../../featuers/students-slice/studentsSlice';
import {
  IncidentsHeader,
  IncidentsTable,
  EmptyState,
  CreateEditIncidentDialog,
  DeleteConfirmationDialog,
} from './components';

const IncidentsPage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { incidents, loading, error } = useSelector((state) => state.incidents);
  const { sections } = useSelector((state) => state.sections);
  const { students, loading: studentsLoading } = useSelector((state) => state.students);

  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    dispatch(fetchIncidents());
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

  // Debug: Log data structure to understand the format
  useEffect(() => {
    if (students.length > 0 && incidents.length > 0) {
      console.log('Students data structure:', students[0]);
      console.log('Incident data structure:', incidents[0]);
      console.log('Sections data structure:', sections[0]);
    }
  }, [students, incidents, sections]);

  const handleCreateClick = () => {
    setCreateDialogOpen(true);
  };

  const handleEditClick = (incident) => {
    setSelectedIncident(incident);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (incident) => {
    setSelectedIncident(incident);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteIncident(selectedIncident.id));
      setDeleteDialogOpen(false);
      setSelectedIncident(null);
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

  // Helper function to get section name by ID
  const getSectionName = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    return section ? section.name : 'Unknown Section';
  };

  // Filter and search incidents
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.student_names.some(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Section filtering: check if any student in this incident belongs to the selected section
    const matchesSection = sectionFilter === 'all' || 
      incident.student_names.some(incidentStudent => {
        // Find the full student data from our students store
        const fullStudent = students.find(s => s.id === incidentStudent.id);
        return fullStudent && fullStudent.section && fullStudent.section.id === parseInt(sectionFilter);
      });
    
    const matchesDate = !dateFilter || 
      incident.date.startsWith(dateFilter);
    
    return matchesSearch && matchesSection && matchesDate;
  });

  if (loading && incidents.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, ...(isRTL && { direction: 'rtl', textAlign: 'right' }) }}>
      {/* Header with Title and Filters */}
      <IncidentsHeader
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

      {/* Incidents Table or Empty State */}
      {filteredIncidents.length === 0 ? (
        <EmptyState
          searchTerm={searchTerm}
          sectionFilter={sectionFilter}
          dateFilter={dateFilter}
          onCreateClick={handleCreateClick}
          onClearFilters={handleClearFilters}
          isRTL={isRTL}
        />
      ) : (
        <IncidentsTable
          incidents={filteredIncidents}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          students={students}
          sections={sections}
        />
      )}

      {/* Dialogs */}
      <CreateEditIncidentDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        isEditMode={false}
        incident={null}
        sections={sections}
        studentsLoading={studentsLoading}
      />

      <CreateEditIncidentDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        isEditMode={true}
        incident={selectedIncident}
        sections={sections}
        studentsLoading={studentsLoading}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        selectedIncident={selectedIncident}
        loading={loading}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default IncidentsPage;
