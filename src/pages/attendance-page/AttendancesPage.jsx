import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Avatar,
  Button,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  Warning as ExcusedIcon,
  Add as AddIcon,
  EventNote as EventNoteIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { fetchAttendances, createAttendance, updateAttendance, deleteAttendance } from '../../featuers/attendances-slice/attendancesSlice';
import { fetchSections } from '../../featuers/sections-slice/sectionsSlice';
import { fetchStudents } from '../../featuers/students-slice/studentsSlice';
import { fetchStudyStages } from '../../featuers/study-stages-slice/studyStagesSlice';
import { fetchGrades } from '../../featuers/grades-slice/gradesSlice';
import SchoolStructureDialog from '../../components/SchoolStructureDialog';
import {
  AttendancesHeader,
  EmptyState,
  DeleteConfirmationDialog,
} from './components';

const AttendancesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { attendances, loading, error } = useSelector((state) => state.attendances);
  const { sections } = useSelector((state) => state.sections);
  const { students, loading: studentsLoading } = useSelector((state) => state.students);
  const { studyStages } = useSelector((state) => state.studyStages);
  const { grades } = useSelector((state) => state.grades);

  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [structureDialogOpen, setStructureDialogOpen] = useState(false);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudyStage, setSelectedStudyStage] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    dispatch(fetchAttendances());
    dispatch(fetchSections());
    dispatch(fetchStudents());
    dispatch(fetchStudyStages());
    dispatch(fetchGrades());
    
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
    navigate('/daily-attendance');
  };

  const handleEditClick = (section) => {
    // Get existing attendance data for this section and date
    const sectionAttendances = attendances.filter(attendance => {
      const student = students.find(s => s.id === attendance.student_id);
      return student?.section?.id === section.id && attendance.date === dateFilter;
    });

    // Navigate to daily attendance page with section pre-selected and existing data
    navigate('/daily-attendance', { 
      state: { 
        sectionId: section.id,
        date: dateFilter || new Date().toISOString().split('T')[0],
        existingAttendances: sectionAttendances
      } 
    });
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

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStudyStage('');
    setSelectedGrade('');
    setSelectedSection('');
    const today = new Date().toISOString().split('T')[0];
    setDateFilter(today);
  };

  // Filter and search attendances
  const filteredAttendances = attendances.filter(attendance => {
    const matchesSearch = 
      attendance.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.note.toLowerCase().includes(searchTerm.toLowerCase());
    
    // School structure filtering
    const student = students.find(s => s.id === attendance.student_id);
    const studentSection = student?.section;
    const studentGrade = studentSection?.grade;
    const studentStudyStage = studentGrade?.study_stage;
    
    const matchesStudyStage = !selectedStudyStage || 
      studentStudyStage?.id === parseInt(selectedStudyStage);
    const matchesGrade = !selectedGrade || 
      studentGrade?.id === parseInt(selectedGrade);
    const matchesSection = !selectedSection || 
      studentSection?.id === parseInt(selectedSection);
    
    const matchesDate = !dateFilter || 
      attendance.date === dateFilter;
    
    return matchesSearch && matchesStudyStage && matchesGrade && matchesSection && matchesDate;
  });

  // Group attendances by section and date
  const groupedAttendances = sections.map(section => {
    const sectionAttendances = filteredAttendances.filter(attendance => {
      const student = students.find(s => s.id === attendance.student_id);
      return student?.section?.id === section.id;
    });

    return {
      section,
      attendances: sectionAttendances
    };
  }).filter(group => {
    // Show section if it has attendances OR if no specific section is selected
    const hasAttendances = group.attendances.length > 0;
    const noSectionFilter = !selectedSection;
    return hasAttendances || noSectionFilter;
  });

  const getStatusIcon = (absent, excused) => {
    if (!absent) return <PresentIcon color="success" />;
    if (excused) return <ExcusedIcon color="warning" />;
    return <AbsentIcon color="error" />;
  };

  const getStatusColor = (absent, excused) => {
    if (!absent) return 'success';
    if (excused) return 'warning';
    return 'error';
  };

  const getStatusText = (absent, excused) => {
    if (!absent) return t('present');
    if (excused) return t('excused');
    return t('absent');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
        selectedStudyStage={selectedStudyStage}
        selectedGrade={selectedGrade}
        selectedSection={selectedSection}
        onStructureClick={() => setStructureDialogOpen(true)}
        getSelectedPath={getSelectedPath}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
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
       {groupedAttendances.length === 0 ? (
         <EmptyState
           searchTerm={searchTerm}
           selectedStudyStage={selectedStudyStage}
           selectedGrade={selectedGrade}
           selectedSection={selectedSection}
           dateFilter={dateFilter}
           onCreateClick={handleCreateClick}
           onClearFilters={handleClearFilters}
           isRTL={isRTL}
         />
       ) : (
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
           {groupedAttendances.map((group) => (
             <Card key={group.section.id} sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
               <CardContent sx={{ p: 3 }}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                   <Box>
                     <Typography variant="h6" sx={{ fontWeight: 600 }}>
                       {group.section.name}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       {group.attendances.length} {t('attendanceRecords')}
                     </Typography>
                   </Box>
                   <Box sx={{ display: 'flex', gap: 1 }}>
                     <Button
                       variant="outlined"
                       size="small"
                       onClick={() => handleEditClick(group.section)}
                       sx={{ minWidth: 'auto' }}
                     >
                       {t('edit')}
                     </Button>
                   </Box>
                 </Box>

                                   {group.attendances.length === 0 ? (
                    <Card sx={{ 
                      p: 3, 
                      textAlign: 'center', 
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
                      border: `1px solid ${theme.palette.divider}`,
                      opacity: 0.8
                    }}>
                      <Box sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                        mb: 1.5,
                        boxShadow: theme.shadows[2]
                      }}>
                        <EventNoteIcon sx={{ fontSize: 24, color: 'white' }} />
                      </Box>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 0.5 }}>
                        {t('noAttendanceRecords')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {t('noAttendanceRecordsForSection')}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={isRTL ? null : <AddIcon />}
                        endIcon={isRTL ? <AddIcon /> : null}
                        onClick={() => handleEditClick(group.section)}
                        sx={{ 
                          px: 2.5, 
                          py: 0.75,
                          borderRadius: 2,
                          boxShadow: theme.shadows[2],
                          '&:hover': {
                            boxShadow: theme.shadows[4],
                            transform: 'translateY(-1px)',
                            transition: 'all 0.2s ease'
                          }
                        }}
                      >
                        {t('addAttendance')}
                      </Button>
                    </Card>
                  ) : (
                   <Grid container spacing={2}>
                     {group.attendances.map((attendance) => (
                       <Grid item xs={12} sm={6} md={4} key={`${attendance.student_id}-${attendance.date}`}>
                         <Card 
                           sx={{ 
                             border: '1px solid',
                             borderColor: 'divider',
                             '&:hover': { borderColor: theme.palette.primary.main }
                           }}
                         >
                           <CardContent sx={{ p: 2 }}>
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                               <Avatar sx={{ 
                                 bgcolor: theme.palette.primary.main,
                                 color: theme.palette.primary.contrastText,
                                 width: 40,
                                 height: 40,
                               }}>
                                 {attendance.student_name.charAt(0).toUpperCase()}
                               </Avatar>
                               <Box sx={{ flex: 1 }}>
                                 <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                   {attendance.student_name}
                                 </Typography>
                               </Box>
                             </Box>

                             {attendance.note && (
                               <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mb: 1 }}>
                                 {attendance.note}
                               </Typography>
                             )}

                             {attendance.excused && (
                               <Chip
                                 label={t('excused')}
                                 size="small"
                                 color="warning"
                                 variant="outlined"
                                 sx={{ fontSize: '0.7rem' }}
                               />
                             )}
                           </CardContent>
                         </Card>
                       </Grid>
                     ))}
                   </Grid>
                 )}
               </CardContent>
             </Card>
           ))}
         </Box>
       )}

             {/* Dialogs */}
       <DeleteConfirmationDialog
         open={deleteDialogOpen}
         onClose={() => setDeleteDialogOpen(false)}
         selectedAttendance={selectedAttendance}
         loading={loading}
         onConfirm={handleDeleteConfirm}
       />

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
         title={t('filterBySchoolStructure')}
       />
    </Box>
  );
};

export default AttendancesPage;
