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
  fetchSubjectsByGrade,
  fetchStudyStages,
  fetchGradesByStudyStage,
  setSelectedFilters,
  clearFilters,
  clearStudentsBySection,
  clearSectionsByGrade,
  clearSubjectsByGrade,
  clearGradesByStudyStage,
  clearStudyStages,
  createMarks,
  updateMark,
} from '../../featuers/marks-slice/marksSlice';
import { fetchSections } from '../../featuers/sections-slice/sectionsSlice';
import { fetchGrades } from '../../featuers/grades-slice/gradesSlice';
import SchoolStructureDialog from '../../components/SchoolStructureDialog';
import { 
  MarksHeader,
  MarksTable,
  MarksFilters,
  SchoolStructureFilters,
  EmptyState,
  EditMarkDialog,
} from './components';
import PerformanceStructureFilters from './components/PerformanceStructureFilters';

const MarksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  
  // Redux selectors
  const { 
    marks, 
    studentsBySection, 
    sectionsByGrade, 
    subjectsByGrade,
    studyStages,
    gradesByStudyStage,
    loading, 
    error 
  } = useSelector((state) => state.marks);
  const { sections } = useSelector((state) => state.sections);
  const { grades } = useSelector((state) => state.grades);
  const { user } = useSelector((state) => state.login);
  
  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [structureDialogOpen, setStructureDialogOpen] = useState(false);

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
    study_stage: '',
  });

  // Determine user role and flow
  const isTeacher = user?.role === 'teacher';
  const isCooperator = user?.role === 'cooperator';
  const isAdmin = user?.role === 'admin';
  const isReadOnly = !!isAdmin;

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

    if (isTeacher) {
      // Teacher flow - cascading filters based on their subjects
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
    } else if (isCooperator || isAdmin) {
      // Cooperator flow - school structure hierarchy
      if (filterName === 'study_stage') {
        // Clear all dependent filters
        newFilters.grade = '';
        newFilters.section = '';
        newFilters.subject = '';
        setLocalSelectedFilters(newFilters);
        dispatch(setSelectedFilters(newFilters));
        dispatch(clearGradesByStudyStage());
        dispatch(clearSectionsByGrade());
        dispatch(clearSubjectsByGrade());
        dispatch(clearStudentsBySection());
        
        // Fetch grades for the selected study stage
        if (value) {
          dispatch(fetchGradesByStudyStage(value));
        }
      } else if (filterName === 'grade') {
        // Clear dependent filters
        newFilters.section = '';
        newFilters.subject = '';
        setLocalSelectedFilters(newFilters);
        dispatch(setSelectedFilters(newFilters));
        dispatch(clearSectionsByGrade());
        dispatch(clearSubjectsByGrade());
        dispatch(clearStudentsBySection());
        
        // Fetch sections and subjects for the selected grade
        if (value) {
          dispatch(fetchSectionsByGrade(value));
          dispatch(fetchSubjectsByGrade(value));
        }
      } else if (filterName === 'section') {
        // Fetch students for the selected section
        if (value) {
          dispatch(fetchStudentsBySection(value));
        }
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
      study_stage: '',
    };
    setLocalSelectedFilters(clearedFilters);
    dispatch(clearFilters());
    dispatch(clearStudentsBySection());
    dispatch(clearSectionsByGrade());
    if (isCooperator) {
      dispatch(clearSubjectsByGrade());
      dispatch(clearGradesByStudyStage());
      dispatch(clearStudyStages());
    }
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
  const [selectedMark, setSelectedMark] = useState(null);
  
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

  // Handle school structure selection
  const handleStructureSelect = ({ studyStage, grade, section }) => {
    const newFilters = {
      ...selectedFilters,
      study_stage: studyStage,
      grade: grade,
      section: section,
    };
    
    setLocalSelectedFilters(newFilters);
    dispatch(setSelectedFilters(newFilters));
    
    // Clear dependent data
    dispatch(clearSectionsByGrade());
    dispatch(clearSubjectsByGrade());
    dispatch(clearStudentsBySection());
    dispatch(clearGradesByStudyStage());
    
    // Fetch grades for the selected study stage
    if (studyStage) {
      dispatch(fetchGradesByStudyStage(studyStage));
    }
    
    // Fetch subjects and sections for the selected grade
    if (grade) {
      dispatch(fetchSubjectsByGrade(grade));
      dispatch(fetchSectionsByGrade(grade));
    }
    
    // Fetch students for the selected section
    if (section) {
      dispatch(fetchStudentsBySection(section));
    }
  };

  const getSelectedPath = () => {
    const stage = studyStages.find(s => s.id === parseInt(selectedFilters.study_stage));
    const grade = grades.find(g => g.id === parseInt(selectedFilters.grade));
    const section = sections.find(s => s.id === parseInt(selectedFilters.section));
    
    let path = '';
    if (stage) path += stage.name;
    if (grade) path += ` → ${grade.name}`;
    if (section) path += ` → ${section.name}`;
    
    return path || t('selectSchoolStructure');
  };

  // Check if search is valid
  const isSearchValid = selectedFilters.subject && selectedFilters.mark_type && selectedFilters.section;

  // Load study stages, grades, and sections for cooperators and admins on component mount
  React.useEffect(() => {
    if ((isCooperator || isAdmin)) {
      if (studyStages.length === 0) {
        dispatch(fetchStudyStages());
      }
      if (grades.length === 0) {
        dispatch(fetchGrades());
      }
      if (sections.length === 0) {
        dispatch(fetchSections());
      }
    }
  }, [isCooperator, isAdmin, studyStages.length, grades.length, sections.length, dispatch]);

  // Get subject name based on user role
  const getSubjectName = () => {
    if (isTeacher) {
      return teacherSubjects.find(s => s.id === parseInt(selectedFilters.subject))?.name || '';
    } else if (isCooperator) {
      return subjectsByGrade.find(s => s.id === parseInt(selectedFilters.subject))?.name || '';
    }
    return '';
  };

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
        subject_name: getSubjectName(),
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
        subject_name: getSubjectName(),
        top_mark: existingMark ? existingMark.top_mark : 100,
        pass_mark: existingMark ? existingMark.pass_mark : 60,
        date: existingMark ? existingMark.date : new Date().toISOString().split('T')[0],
        markId: existingMark ? existingMark.id : null,
      };
    });
  }, [studentsBySection, marks, selectedFilters, teacherSubjects, subjectsByGrade, isTeacher, isCooperator]);

  return (
    <Box sx={{ p: 3 }}>
      <MarksHeader 
        onCreateClick={handleCreateClick}
        onClearFilters={handleClearFilters}
        isAddMode={isAddMode}
        isSearchValid={isSearchValid}
        disabled={isReadOnly}
      />

      {/* Instructions under header */}
      <Alert severity="info" sx={{ mb: 2 }}>
        <strong>{t('Instructions')}:</strong> {isTeacher 
          ? t('Select a subject (grade will be automatically set), then choose a section and exam type to view student marks. Students without marks will show a mark of 0.')
          : t('Select a study stage, then choose a grade, section, subject, and exam type to view student marks. Students without marks will show a mark of 0.')}
      </Alert>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isTeacher ? (
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
      ) : (isCooperator || isAdmin) ? (
        <PerformanceStructureFilters
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onStructureClick={() => setStructureDialogOpen(true)}
          getSelectedPath={getSelectedPath}
          subjectsByGrade={subjectsByGrade}
          markTypes={markTypes}
          onSearch={handleSearchMarks}
          isSearchValid={isSearchValid}
          isRTL={isRTL}
          disabled={isAddMode}
        />
      ) : null}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      ) : combinedData.length > 0 ? (
               <MarksTable
          data={combinedData}
          onEdit={handleEditClick}
          isRTL={isRTL}
          isAddMode={isAddMode}
          onSaveMarks={handleSaveMarks}
          onCancelAdd={handleCancelAdd}
          markInputs={markInputs}
          setMarkInputs={setMarkInputs}
          readOnly={isReadOnly}
        />
      ) : (
        <EmptyState />
      )}

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

      {/* School Structure Dialog */}
      <SchoolStructureDialog
        open={structureDialogOpen}
        onClose={() => setStructureDialogOpen(false)}
        onSelect={handleStructureSelect}
        studyStages={studyStages || []}
        grades={grades || []}
        sections={sections || []}
        selectedStudyStage={selectedFilters.study_stage}
        selectedGrade={selectedFilters.grade}
        selectedSection={selectedFilters.section}
        title={t('selectSchoolStructure')}
      />
    </Box>
  );
};

export default MarksPage;
