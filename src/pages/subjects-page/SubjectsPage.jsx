import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchSubjects, createSubject, updateSubject, deleteSubject } from '../../featuers/subjects-slice/subjectsSlice';
import { fetchGrades } from '../../featuers/grades-slice/gradesSlice';
import {
  SubjectsHeader,
  SubjectsTable,
  EmptyState,
  CreateSubjectDialog,
  EditSubjectDialog,
  DeleteConfirmationDialog,
} from './components';

const SubjectsPage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { subjects, loading, error } = useSelector((state) => state.subjects);
  const { grades } = useSelector((state) => state.grades);

  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Form state - updated to use grade_id
  const [formData, setFormData] = useState({ name: '', grade_id: '', teacher: [] });
  const [formErrors, setFormErrors] = useState({});

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchGrades());
  }, [dispatch]);

  const handleCreateClick = () => {
    setFormData({ name: '', grade_id: '', teacher: [] });
    setFormErrors({});
    setCreateDialogOpen(true);
  };

  const handleEditClick = (subject) => {
    setSelectedSubject(subject);
    setFormData({ 
      name: subject.name, 
      grade_id: subject.grade ? subject.grade.id : (subject.grade_id || ''), 
      teacher: subject.teacher ? subject.teacher.map(t => typeof t === 'string' ? t : t.name) : [] 
    });
    setFormErrors({});
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (subject) => {
    setSelectedSubject(subject);
    setDeleteDialogOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = t('subjectNameRequired');
    }
    if (!formData.grade_id) {
      errors.grade_id = t('gradeRequired');
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
    if (!validateForm()) return;
    const resultAction = await dispatch(createSubject(formData));
    if (createSubject.fulfilled.match(resultAction)) {
      setCreateDialogOpen(false);
      setFormData({ name: '', grade_id: '', teacher: [] });
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;
    const resultAction = await dispatch(updateSubject({ id: selectedSubject.id, data: formData }));
    if (updateSubject.fulfilled.match(resultAction)) {
      setEditDialogOpen(false);
      setSelectedSubject(null);
      setFormData({ name: '', grade_id: '', teacher: [] });
    }
  };

  const handleDeleteConfirm = async () => {
    const resultAction = await dispatch(deleteSubject(selectedSubject.id));
    if (deleteSubject.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);
      setSelectedSubject(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getTeacherInitials = (teacher) => {
    // Handle both string and object formats
    let teacherName;
    
    if (typeof teacher === 'string') {
      teacherName = teacher;
    } else if (teacher && typeof teacher === 'object' && teacher.name) {
      teacherName = teacher.name;
    } else {
      return '?';
    }
    
    // Handle cases where teacherName might be null, undefined, or not a string
    if (!teacherName || typeof teacherName !== 'string') {
      return '?';
    }
    
    // Split by spaces and get first letter of each word
    const initials = teacherName.trim().split(' ').map(name => {
      return name && name.length > 0 ? name[0] : '';
    }).filter(initial => initial).join('');
    
    return initials.toUpperCase() || '?';
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      'KG1': 'primary', 'KG2': 'primary', 'KG3': 'primary',
      '1': 'secondary', '2': 'secondary', '3': 'secondary', '4': 'secondary', '5': 'secondary',
      '6': 'info', '7': 'info', '8': 'info',
      '9': 'warning', '10': 'warning',
      '11': 'error', '12': 'error',
    };
    return gradeColors[grade] || 'default';
  };

  // Helper function to get grade name from subject
  const getGradeName = (subject) => {
    if (subject.grade && subject.grade.name) {
      return subject.grade.name;
    }
    return 'Unknown Grade';
  };

  // Helper function to get grade name for filtering
  const getGradeNameForFilter = (subject) => {
    return getGradeName(subject);
  };

  const filteredAndSortedSubjects = subjects
    .filter(subject => {
      const gradeName = getGradeNameForFilter(subject);
      const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gradeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subject.teacher?.some(teacher => {
                             const teacherName = typeof teacher === 'string' ? teacher : teacher.name;
                             return teacherName && teacherName.toLowerCase().includes(searchTerm.toLowerCase());
                           });
      const matchesGrade = gradeFilter === 'all' || gradeName === gradeFilter;
      return matchesSearch && matchesGrade;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'grade': return getGradeNameForFilter(a).localeCompare(getGradeNameForFilter(b));
        case 'teachers': return (a.teacher?.filter(teacher => teacher && (typeof teacher === 'string' ? teacher.trim() : teacher.name)).length || 0) - (b.teacher?.filter(teacher => teacher && (typeof teacher === 'string' ? teacher.trim() : teacher.name)).length || 0);
        default: return 0;
      }
    });

  // Get unique grades for filter from subjects data
  const uniqueGrades = [...new Set(subjects.map(subject => getGradeName(subject)))].sort();

  const handleClearFilters = () => {
    setSearchTerm('');
    setGradeFilter('all');
  };

  if (loading && subjects.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, ...(isRTL && { direction: 'rtl', textAlign: 'right' }) }}>
      {/* Header with Title and Filters */}
      <SubjectsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        uniqueGrades={uniqueGrades}
        onCreateClick={handleCreateClick}
        isRTL={isRTL}
      />

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Subjects Table or Empty State */}
      {filteredAndSortedSubjects.length === 0 ? (
        <EmptyState
          searchTerm={searchTerm}
          gradeFilter={gradeFilter}
          onCreateClick={handleCreateClick}
          onClearFilters={handleClearFilters}
          isRTL={isRTL}
        />
      ) : (
        <SubjectsTable
          subjects={filteredAndSortedSubjects}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          getGradeName={getGradeName}
          getGradeColor={getGradeColor}
          getTeacherInitials={getTeacherInitials}
        />
      )}

      {/* Dialogs */}
      <CreateSubjectDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        formData={formData}
        formErrors={formErrors}
        grades={grades}
        loading={loading}
        onInputChange={handleInputChange}
        onSubmit={handleCreateSubmit}
      />

      <EditSubjectDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        formData={formData}
        formErrors={formErrors}
        grades={grades}
        loading={loading}
        onInputChange={handleInputChange}
        onSubmit={handleEditSubmit}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        selectedSubject={selectedSubject}
        loading={loading}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default SubjectsPage; 