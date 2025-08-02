import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Alert,
  useTheme,
} from '@mui/material';
import {
  School as SchoolIcon,
  Grade as GradeIcon,
  Class as ClassIcon,
  AccountTree as AccountTreeIcon,
  ChildCare as ChildCareIcon,
  SchoolOutlined as ElementaryIcon,
  Groups as GroupsIcon,
  Category as CategoryIcon,
  Folder as FolderIcon,
  Book as BookIcon,
  ChildFriendly as ChildFriendlyIcon,
} from '@mui/icons-material';
import {
  fetchStudyStages,
  createStudyStage,
  updateStudyStage,
  deleteStudyStage,
} from '../../featuers/study-stages-slice/studyStagesSlice';
import {
  fetchGrades,
  createGrade,
  updateGrade,
  deleteGrade,
} from '../../featuers/grades-slice/gradesSlice';
import {
  fetchSections,
  createSection,
  updateSection,
  deleteSection,
} from '../../featuers/sections-slice/sectionsSlice';
import { fetchStudyYears } from '../../featuers/study-years-slice/studyYearsSlice';

// Import extracted components
import SchoolStructureHeader from './components/SchoolStructureHeader';
import EmptyState from './components/EmptyState';
import StudyStageAccordion from './components/StudyStageAccordion';
import CreateEditDialog from './components/CreateEditDialog';

const SchoolStructurePage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isRTL = i18n.language === 'ar';
  const theme = useTheme();

  // Redux selectors
  const { studyStages: apiStudyStages, loading: studyStagesLoading, error: studyStagesError } = useSelector(
    (state) => state.studyStages
  );
  const { grades, loading: gradesLoading, error: gradesError } = useSelector(
    (state) => state.grades
  );
  const { sections, loading: sectionsLoading, error: sectionsError } = useSelector(
    (state) => state.sections
  );
  const { studyYears } = useSelector((state) => state.studyYears);

  // Extract study stages from grades if API study stages are empty
  const studyStages = apiStudyStages.length > 0 ? apiStudyStages : 
    [...new Set(grades.map(grade => JSON.stringify(grade.study_stage)))].map(stageStr => JSON.parse(stageStr));

  // Local state
  const [expandedStage, setExpandedStage] = useState(null);
  const [expandedGrade, setExpandedGrade] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMode, setDialogMode] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    study_stage_id: '',
    study_year_id: '',
    grade_id: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchStudyStages());
    dispatch(fetchGrades());
    dispatch(fetchSections());
    dispatch(fetchStudyYears());
  }, [dispatch]);

  // Event handlers
  const handleStageExpansion = (stageId) => (event, isExpanded) => {
    setExpandedStage(isExpanded ? stageId : null);
  };

  const handleGradeExpansion = (gradeId) => (event, isExpanded) => {
    setExpandedGrade(isExpanded ? gradeId : null);
  };

  const handleOpenDialog = (type, mode = 'create', item = null, stageId = null, gradeId = null) => {
    setDialogType(type);
    setDialogMode(mode);
    setSelectedItem(item);
    setFormErrors({});
    
    if (mode === 'edit' && item) {
      setFormData({
        name: item.name,
        study_stage_id: item.study_stage?.id || '',
        study_year_id: item.study_year?.id || '',
        grade_id: item.grade?.id || '',
      });
    } else {
      setFormData({
        name: '',
        study_stage_id: stageId || '',
        study_year_id: '',
        grade_id: gradeId || '',
      });
    }
    
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({
      name: '',
      study_stage_id: '',
      study_year_id: '',
      grade_id: '',
    });
    setFormErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = t('nameRequired');
    }
    
    if (dialogType === 'grade') {
      if (!formData.study_stage_id) {
        errors.study_stage_id = t('studyStageRequired');
      }
      if (!formData.study_year_id) {
        errors.study_year_id = t('studyYearRequired');
      }
    }
    
    if (dialogType === 'section' && !formData.grade_id) {
      errors.grade_id = t('gradeRequired');
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (dialogType === 'studyStage') {
        if (dialogMode === 'create') {
          await dispatch(createStudyStage({ name: formData.name })).unwrap();
        } else {
          await dispatch(updateStudyStage({ id: selectedItem.id, name: formData.name })).unwrap();
        }
      } else if (dialogType === 'grade') {
        if (dialogMode === 'create') {
          await dispatch(createGrade({
            name: formData.name,
            study_stage: formData.study_stage_id,
            study_year: formData.study_year_id,
          })).unwrap();
        } else {
          await dispatch(updateGrade({
            id: selectedItem.id,
            name: formData.name,
            study_stage: formData.study_stage_id,
            study_year: formData.study_year_id,
          })).unwrap();
        }
      } else if (dialogType === 'section') {
        if (dialogMode === 'create') {
          await dispatch(createSection({
            name: formData.name,
            grade: formData.grade_id,
          })).unwrap();
        } else {
          await dispatch(updateSection({
            id: selectedItem.id,
            name: formData.name,
            grade: formData.grade_id,
          })).unwrap();
        }
      }
      
      handleCloseDialog();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(t('confirmDelete'))) return;

    try {
      if (type === 'studyStage') {
        await dispatch(deleteStudyStage(id)).unwrap();
      } else if (type === 'grade') {
        await dispatch(deleteGrade(id)).unwrap();
      } else if (type === 'section') {
        await dispatch(deleteSection(id)).unwrap();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Helper functions
  const getGradesForStage = (stageId) => {
    return grades.filter(grade => grade.study_stage.id === stageId);
  };

  const getSectionsForGrade = (gradeId) => {
    return sections.filter(section => section.grade.id === gradeId);
  };

  const getStudyStageIcon = (stageName) => {
    const name = stageName.toLowerCase();
    if (name.includes('kindergarten')) return <ChildCareIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />;
    if (name.includes('elementary')) return <ElementaryIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />;
    if (name.includes('middle')) return <SchoolIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />;
    if (name.includes('high')) return <AccountTreeIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />;
    return <GroupsIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />;
  };

  const getGradeIcon = (gradeName) => {
    const name = gradeName.toLowerCase();
    if (name.includes('kg')) return <ChildFriendlyIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />;
    if (name.includes('grade')) return <GradeIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />;
    return <ClassIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />;
  };

  const getSectionIcon = (sectionName) => {
    return <BookIcon sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />;
  };

  // Loading state
  if (studyStagesLoading || gradesLoading || sectionsLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="info">{t('loading')}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3,
      background: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <SchoolStructureHeader 
        onCreateStudyStage={() => handleOpenDialog('studyStage', 'create')}
      />

      {/* Error Display */}
      {(gradesError || sectionsError) && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {gradesError || sectionsError}
        </Alert>
      )}

      {/* School Structure Tree */}
      <Paper sx={{ 
        p: 3, 
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        border: theme.palette.mode === 'dark' ? '1px solid #333' : 'none'
      }}>
        {studyStages.length === 0 ? (
          <EmptyState onCreateStudyStage={() => handleOpenDialog('studyStage', 'create')} />
        ) : (
          studyStages.map((stage) => (
            <StudyStageAccordion
              key={stage.id}
              stage={stage}
              expandedStage={expandedStage}
              expandedGrade={expandedGrade}
              onStageExpansion={handleStageExpansion}
              onGradeExpansion={handleGradeExpansion}
              onEditStage={(stage) => handleOpenDialog('studyStage', 'edit', stage)}
              onDeleteStage={(id) => handleDelete('studyStage', id)}
              onCreateGrade={(stageId) => handleOpenDialog('grade', 'create', null, stageId)}
              onEditGrade={(grade) => handleOpenDialog('grade', 'edit', grade)}
              onDeleteGrade={(id) => handleDelete('grade', id)}
              onCreateSection={(gradeId) => handleOpenDialog('section', 'create', null, null, gradeId)}
              onEditSection={(section) => handleOpenDialog('section', 'edit', section)}
              onDeleteSection={(id) => handleDelete('section', id)}
              getStudyStageIcon={getStudyStageIcon}
              getGradeIcon={getGradeIcon}
              getSectionIcon={getSectionIcon}
              getGradesForStage={getGradesForStage}
              getSectionsForGrade={getSectionsForGrade}
            />
          ))
        )}
      </Paper>

      {/* Dialog for Create/Edit */}
      <CreateEditDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        dialogType={dialogType}
        dialogMode={dialogMode}
        formData={formData}
        formErrors={formErrors}
        studyStages={studyStages}
        grades={grades}
        studyYears={studyYears}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default SchoolStructurePage; 