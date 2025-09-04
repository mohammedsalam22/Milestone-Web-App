import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  fetchMarks, 
  fetchStudentsBySection, 
  fetchSectionsByGrade,
  setSelectedFilters,
  clearFilters,
  clearStudentsBySection,
  clearSectionsByGrade,
  createMarks,
  updateMark,
} from '../../featuers/marks-slice/marksSlice';
import { 
  MarksHeader,
  MarksTable,
  MarksFilters,
  EmptyState,
  DeleteConfirmationDialog,
  EditMarkDialog,
} from './components';

const MarksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  
  // Redux selectors
  const { marks, studentsBySection, sectionsByGrade, loading, error } = useSelector((state) => state.marks);
  const { user } = useSelector((state) => state.login);
  
  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMark, setSelectedMark] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  // Add mode states
  const [isAddMode, setIsAddMode] = useState(false);
  const [markInputs, setMarkInputs] = useState({});

  // Success notification
  const [successMessage, setSuccessMessage] = useState('');

  // Filter states
  const [selectedFilters, setLocalSelectedFilters] = useState({
    subject: '',
    grade: '',
    section: '',
    mark_type: '',
  });

  // Available mark types
  const markTypes = ['exam 1', 'exam 2', 'exam 3', 'exam 4'];

  // Get teacher's subjects from user data
  const teacherSubjects = useMemo(() => {
    if (user?.entity?.subjects) {
      return user.entity.subjects.map(subject => ({
        id: subject.id,
        name: subject.name,
        grade: subject.grade,
      }));
    }
    return [];
  }, [user]);

  // Get unique grades from teacher's subjects
  const teacherGrades = useMemo(() => {
    const grades = teacherSubjects.map(subject => subject.grade);
    return grades.filter((grade, index, self) => 
      index === self.findIndex(g => g.id === grade.id)
    );
  }, [teacherSubjects]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...selectedFilters, [filterName]: value };
    setLocalSelectedFilters(newFilters);
    dispatch(setSelectedFilters(newFilters));

    // Clear dependent filters
    if (filterName === 'subject') {
      // Automatically set the grade for the selected subject
      const selectedSubject = teacherSubjects.find(s => s.id === parseInt(value));
      if (selectedSubject) {
        newFilters.grade = selectedSubject.grade.id;
        newFilters.section = '';
        setLocalSelectedFilters(newFilters);
        dispatch(setSelectedFilters(newFilters));
        dispatch(clearStudentsBySection());
        
        // Fetch sections for the automatically selected grade
        dispatch(fetchSectionsByGrade(selectedSubject.grade.id));
      } else {
        newFilters.grade = '';
        newFilters.section = '';
        setLocalSelectedFilters(newFilters);
        dispatch(setSelectedFilters(newFilters));
        dispatch(clearSectionsByGrade());
        dispatch(clearStudentsBySection());
      }
    } else if (filterName === 'grade') {
      newFilters.section = '';
      setLocalSelectedFilters(newFilters);
      dispatch(setSelectedFilters(newFilters));
      dispatch(clearStudentsBySection());
      
      // Fetch sections for the selected grade
      if (value) {
        dispatch(fetchSectionsByGrade(value));
      }
    } else if (filterName === 'section') {
      // Fetch students for the selected section
      if (value) {
        dispatch(fetchStudentsBySection(value));
      }
    }
  };

  // Handle search/fetch marks
  const handleSearchMarks = () => {
    if (selectedFilters.subject && selectedFilters.mark_type && selectedFilters.section) {
      const filters = {
        subject: selectedFilters.subject,
        mark_type: selectedFilters.mark_type,
        student__section: selectedFilters.section,
      };
      dispatch(fetchMarks(filters));
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    const clearedFilters = {
      subject: '',
      grade: '',
      section: '',
      mark_type: '',
    };
    setLocalSelectedFilters(clearedFilters);
    dispatch(clearFilters());
    dispatch(clearStudentsBySection());
    dispatch(clearSectionsByGrade());
  };

  // Handle create new mark
  const handleCreateClick = () => {
    if (!isSearchValid) {
      return;
    }
    setIsAddMode(true);
    setMarkInputs({});
  };

  // Handle cancel add mode
  const handleCancelAdd = () => {
    setIsAddMode(false);
    setMarkInputs({});
  };

  // Handle save marks
  const handleSaveMarks = async () => {
    if (!selectedFilters.subject || !selectedFilters.mark_type || !selectedFilters.section) {
      return;
    }

    // Filter out students who already have marks and create the payload
    const marksToCreate = [];
    const currentDate = new Date().toISOString().split('T')[0];

    combinedData.forEach(row => {
      const studentId = row.student.id;
      const currentMark = row.mark;
      const inputMark = markInputs[studentId];

      // Only create marks for students who:
      // 1. Don't already have a mark (currentMark === 0)
      // 2. Have a valid input mark (not empty and not 0)
      if (currentMark === 0 && inputMark && inputMark !== '' && parseFloat(inputMark) > 0) {
        marksToCreate.push({
          student: studentId,
          subject: parseInt(selectedFilters.subject),
          mark_type: selectedFilters.mark_type,
          top_mark: row.top_mark,
          pass_mark: row.pass_mark,
          mark: parseFloat(inputMark),
          date: currentDate,
        });
      }
    });

    if (marksToCreate.length === 0) {
      // Show message that no marks to create
      return;
    }

    try {
      await dispatch(createMarks(marksToCreate)).unwrap();
      // Exit add mode and refresh the marks
      setIsAddMode(false);
      setMarkInputs({});
      handleSearchMarks();
      setSuccessMessage(t('Marks created successfully!'));
    } catch (error) {
      console.error('Failed to create marks:', error);
    }
  };

  // Handle edit mark
  const handleEditClick = (row) => {
    // Find the actual mark data from the marks array
    const studentFullName = `${row.student.card.first_name} ${row.student.card.last_name}`;
    const markData = marks.find(mark => mark.student_name === studentFullName);
    
    if (markData) {
      setSelectedMark(markData);
      setEditDialogOpen(true);
      setEditError(null);
    }
  };

  // Handle save edit
  const handleSaveEdit = async (editData) => {
    setEditLoading(true);
    setEditError(null);
    
    try {
      // The updateMark thunk expects { id, data } structure
      await dispatch(updateMark({ 
        id: editData.id, 
        data: { mark: editData.mark } 
      })).unwrap();
      setEditDialogOpen(false);
      setSelectedMark(null);
      setSuccessMessage(t('Mark updated successfully!'));
      // Refresh the marks to show updated data
      handleSearchMarks();
    } catch (error) {
      setEditError(error.message || t('Failed to update mark'));
    } finally {
      setEditLoading(false);
    }
  };

  // Handle delete mark
  const handleDeleteClick = (mark) => {
    setSelectedMark(mark);
    setDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    // TODO: Implement delete functionality
    setDeleteDialogOpen(false);
    setSelectedMark(null);
  };

  // Handle close edit dialog
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedMark(null);
    setEditError(null);
  };

  // Handle close success message
  const handleCloseSuccessMessage = () => {
    setSuccessMessage('');
  };

  // Check if search is valid
  const isSearchValid = selectedFilters.subject && selectedFilters.mark_type && selectedFilters.section;

  // Combine marks and students data
  const combinedData = useMemo(() => {
    if (!studentsBySection.length) {
      return [];
    }
    
    if (!marks.length) {
      return studentsBySection.map(student => ({
        student,
        mark: 0,
        mark_type: selectedFilters.mark_type,
        subject_name: teacherSubjects.find(s => s.id === parseInt(selectedFilters.subject))?.name || '',
        top_mark: 100,
        pass_mark: 60,
        date: new Date().toISOString().split('T')[0],
      }));
    }

    return studentsBySection.map(student => {
      const studentFullName = `${student.card.first_name} ${student.card.last_name}`;
      const existingMark = marks.find(mark => 
        mark.student_name === studentFullName
      );
      
      return {
        student,
        mark: existingMark ? existingMark.mark : 0,
        mark_type: selectedFilters.mark_type,
        subject_name: teacherSubjects.find(s => s.id === parseInt(selectedFilters.subject))?.name || '',
        top_mark: existingMark ? existingMark.top_mark : 100,
        pass_mark: existingMark ? existingMark.pass_mark : 60,
        date: existingMark ? existingMark.date : new Date().toISOString().split('T')[0],
        markId: existingMark ? existingMark.id : null,
      };
    });
  }, [studentsBySection, marks, selectedFilters, teacherSubjects]);

  return (
    <Box sx={{ p: 3 }}>
      <MarksHeader 
        onCreateClick={handleCreateClick}
        onClearFilters={handleClearFilters}
        isAddMode={isAddMode}
        isSearchValid={isSearchValid}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <MarksFilters
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        teacherSubjects={teacherSubjects}
        teacherGrades={teacherGrades}
        sectionsByGrade={sectionsByGrade}
        markTypes={markTypes}
        onSearch={handleSearchMarks}
        isSearchValid={isSearchValid}
        isRTL={isRTL}
        disabled={isAddMode}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      ) : combinedData.length > 0 ? (
        <MarksTable
          data={combinedData}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          isRTL={isRTL}
          isAddMode={isAddMode}
          onSaveMarks={handleSaveMarks}
          onCancelAdd={handleCancelAdd}
          markInputs={markInputs}
          setMarkInputs={setMarkInputs}
        />
      ) : (
        <EmptyState />
      )}

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        mark={selectedMark}
      />

      <EditMarkDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveEdit}
        mark={selectedMark}
        loading={editLoading}
        error={editError}
      />

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccessMessage} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MarksPage;
