import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Grid,
  Checkbox,
  FormControlLabel,
  Chip,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { createDailyAttendance, updateAttendance } from '../../featuers/attendances-slice/attendancesSlice';
import { fetchSections } from '../../featuers/sections-slice/sectionsSlice';
import { fetchStudents } from '../../featuers/students-slice/studentsSlice';
import { fetchStudyStages } from '../../featuers/study-stages-slice/studyStagesSlice';
import { fetchGrades } from '../../featuers/grades-slice/gradesSlice';
import SchoolStructureDialog from '../../components/SchoolStructureDialog';

const DailyAttendancePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { loading, error } = useSelector((state) => state.attendances);
  const { sections } = useSelector((state) => state.sections);
  const { studyStages } = useSelector((state) => state.studyStages);
  const { grades } = useSelector((state) => state.grades);
  const { students, loading: studentsLoading } = useSelector((state) => state.students);

  const isRTL = i18n.language === 'ar';

  // Get pre-selected values from navigation state
  const preSelectedSection = location.state?.sectionId || '';
  const preSelectedDate = location.state?.date || new Date().toISOString().split('T')[0];
  const existingAttendances = location.state?.existingAttendances || [];

  // Form states
  const [selectedStudyStage, setSelectedStudyStage] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState(preSelectedSection);
  const [selectedDate, setSelectedDate] = useState(preSelectedDate);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [studentNotes, setStudentNotes] = useState({});
  const [studentExcused, setStudentExcused] = useState({});
  const [structureDialogOpen, setStructureDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchStudents());
    dispatch(fetchStudyStages());
    dispatch(fetchGrades());
  }, [dispatch]);

  // Clear section when grade changes
  useEffect(() => {
    setSelectedSection('');
  }, [selectedGrade]);

  // Pre-populate form with existing attendance data
  useEffect(() => {
    if (existingAttendances.length > 0) {
      const initialSelectedStudents = {};
      const initialStudentNotes = {};
      const initialStudentExcused = {};

      existingAttendances.forEach(attendance => {
        initialSelectedStudents[attendance.student_id] = true;
        if (attendance.note) {
          initialStudentNotes[attendance.student_id] = attendance.note;
        }
        if (attendance.excused) {
          initialStudentExcused[attendance.student_id] = true;
        }
      });

      setSelectedStudents(initialSelectedStudents);
      setStudentNotes(initialStudentNotes);
      setStudentExcused(initialStudentExcused);
    }
  }, [existingAttendances]);

  // Filter students by selected section
  const sectionStudents = students.filter(student => 
    student.section?.id === parseInt(selectedSection)
  );


  const handleStudentToggle = (studentId) => {
    setSelectedStudents(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
    
    // Clear note and excused status when unchecking
    if (selectedStudents[studentId]) {
      setStudentNotes(prev => {
        const newNotes = { ...prev };
        delete newNotes[studentId];
        return newNotes;
      });
      setStudentExcused(prev => {
        const newExcused = { ...prev };
        delete newExcused[studentId];
        return newExcused;
      });
    }
  };

  const handleNoteChange = (studentId, note) => {
    setStudentNotes(prev => ({
      ...prev,
      [studentId]: note
    }));
  };

  const handleExcusedChange = (studentId, excused) => {
    setStudentExcused(prev => ({
      ...prev,
      [studentId]: excused
    }));
  };

  const handleStructureSelect = ({ studyStage, grade, section }) => {
    setSelectedStudyStage(studyStage);
    setSelectedGrade(grade);
    setSelectedSection(section);
  };

  const getSelectedPath = () => {
    const stage = studyStages.find(s => s.id === parseInt(selectedStudyStage));
    const grade = grades.find(g => g.id === parseInt(selectedGrade));
    const section = sections.find(s => s.id === parseInt(selectedSection));
    
    let path = '';
    if (stage) path += stage.name;
    if (grade) path += ` → ${grade.name}`;
    if (section) path += ` → ${section.name}`;
    
    return path || t('selectSchoolStructure');
  };

  const handleSubmit = async () => {
    if (!selectedSection || !selectedDate) {
      return;
    }

    const isEditMode = existingAttendances.length > 0;

    if (isEditMode) {
      // Update existing attendance records
      const updatePromises = existingAttendances.map(attendance => {
        const isSelected = selectedStudents[attendance.student_id];
        const note = studentNotes[attendance.student_id] || '';
        const excused = studentExcused[attendance.student_id] || false;

        return dispatch(updateAttendance({
          id: attendance.id,
          data: {
            date: selectedDate,
            student_id: attendance.student_id,
            absent: isSelected,
            excused: excused,
            note: note
          }
        }));
      });

      try {
        await Promise.all(updatePromises);
        navigate('/attendances');
      } catch (error) {
        // Error handling is done in the slice
      }
    } else {
      // Create new attendance records
      const attendancesData = Object.keys(selectedStudents)
        .filter(studentId => selectedStudents[studentId])
        .map(studentId => ({
          date: selectedDate,
          student_id: parseInt(studentId),
          absent: true,
          excused: studentExcused[studentId] || false,
          note: studentNotes[studentId] || ''
        }));

      try {
        await dispatch(createDailyAttendance(attendancesData));
        navigate('/attendances');
      } catch (error) {
        // Error handling is done in the slice
      }
    }
  };

  const handleCancel = () => {
    navigate('/attendances');
  };

  const getStudentDisplayName = (student) => {
    if (student.card && student.card.first_name && student.card.last_name) {
      return `${student.card.first_name} ${student.card.last_name}`;
    }
    return student.name || student.first_name || student.full_name || student.username || 'Unknown Student';
  };

  const selectedCount = Object.values(selectedStudents).filter(Boolean).length;
  const isEditMode = existingAttendances.length > 0;

  return (
    <Box sx={{ p: 3, ...(isRTL && { direction: 'rtl', textAlign: 'right' }) }}>
             {/* Header */}
       <Box sx={{ mb: 3 }}>
         <Typography variant="h4" component="h1" gutterBottom>
           {isEditMode ? t('editDailyAttendance') : t('dailyAttendance')}
         </Typography>
         <Typography variant="body1" color="text.secondary">
           {isEditMode ? t('editDailyAttendanceDescription') : t('dailyAttendanceDescription')}
         </Typography>
       </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Card sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('selectSectionAndDate')}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={6}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setStructureDialogOpen(true)}
              sx={{
                height: 56,
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                borderStyle: 'dashed',
                borderWidth: 2,
                '&:hover': {
                  borderStyle: 'solid',
                  borderWidth: 2,
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <SchoolIcon color="primary" />
                <Typography variant="body1" color="text.primary">
                  {getSelectedPath()}
                </Typography>
              </Box>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label={t('date')}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={isRTL ? null : <SaveIcon />}
                endIcon={isRTL ? <SaveIcon /> : null}
                onClick={handleSubmit}
                disabled={!selectedSection || selectedCount === 0 || loading}
                sx={{ minWidth: 120 }}
              >
                {loading ? <CircularProgress size={20} /> : t('save')}
              </Button>
              <Button
                variant="outlined"
                startIcon={isRTL ? null : <CancelIcon />}
                endIcon={isRTL ? <CancelIcon /> : null}
                onClick={handleCancel}
              >
                {t('cancel')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Students Grid */}
      {selectedSection && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              {t('students')} ({sectionStudents.length})
            </Typography>
            <Chip 
              label={`${t('selected')}: ${selectedCount}`} 
              color="primary" 
              variant="outlined"
            />
          </Box>

          {studentsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : sectionStudents.length === 0 ? (
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                {t('noStudentsInSection')}
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {sectionStudents.map((student) => (
                <Grid item xs={12} sm={6} md={4} key={student.id}>
                  <Card 
                    sx={{ 
                      border: selectedStudents[student.id] ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                      transition: 'border-color 0.2s ease',
                      '&:hover': {
                        borderColor: theme.palette.primary.light,
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedStudents[student.id] || false}
                              onChange={() => handleStudentToggle(student.id)}
                              color="primary"
                            />
                          }
                          label={
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {getStudentDisplayName(student)}
                            </Typography>
                          }
                        />
                      </Box>

                      {selectedStudents[student.id] && (
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            fullWidth
                            label={t('note')}
                            value={studentNotes[student.id] || ''}
                            onChange={(e) => handleNoteChange(student.id, e.target.value)}
                            multiline
                            rows={2}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={studentExcused[student.id] || false}
                                onChange={(e) => handleExcusedChange(student.id, e.target.checked)}
                                color="warning"
                              />
                            }
                            label={t('excused')}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* School Structure Dialog */}
      <SchoolStructureDialog
        open={structureDialogOpen}
        onClose={() => setStructureDialogOpen(false)}
        onSelect={handleStructureSelect}
        studyStages={studyStages || []}
        grades={grades || []}
        sections={sections || []}
        selectedStudyStage={selectedStudyStage}
        selectedGrade={selectedGrade}
        selectedSection={selectedSection}
        title={t('selectSchoolStructure')}
      />
    </Box>
  );
};

export default DailyAttendancePage;
