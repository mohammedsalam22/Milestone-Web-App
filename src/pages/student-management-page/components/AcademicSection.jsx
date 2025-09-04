import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  School,
  ExpandMore,
  EventNote,
  Warning,
  TrendingUp,
  CheckCircle,
  Cancel,
  Schedule,
  Assessment,
  Timeline,
  Person,
  AttachMoney,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentAttendances } from '../../../featuers/attendances-slice/attendancesSlice';
import { fetchStudentIncidents } from '../../../featuers/incidents-slice/incidentsSlice';
import { fetchStudentMarks } from '../../../featuers/marks-slice/marksSlice';

const AcademicSection = ({ student }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { studentAttendances, loading, error } = useSelector((state) => state.attendances);
  const { studentIncidents, loading: incidentsLoading, error: incidentsError } = useSelector((state) => state.incidents);
  const { studentMarks, loading: marksLoading, error: marksError } = useSelector((state) => state.marks);
  
  const [expandedSections, setExpandedSections] = useState({
    attendance: false,
    incidents: false,
    performance: false,
  });

  // Load data on component mount
  useEffect(() => {
    dispatch(fetchStudentAttendances(student.id));
    dispatch(fetchStudentIncidents(student.id));
    dispatch(fetchStudentMarks(student.id));
  }, [dispatch, student.id]);

  const handleToggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getAttendanceStatus = (absent, excused) => {
    if (!absent) return { label: 'Present', color: 'success' };
    if (excused) return { label: 'Excused Absence', color: 'warning' };
    return { label: 'Absent', color: 'error' };
  };

  // Calculate attendance summary
  const getAttendanceSummary = () => {
    const total = 180; // Fixed total days
    
    if (!studentAttendances || studentAttendances.length === 0) {
      return { total, present: 0, absent: 0, excused: 0, percentage: 0 };
    }
    
    const absent = studentAttendances.filter(att => att.absent && !att.excused).length;
    const excused = studentAttendances.filter(att => att.absent && att.excused).length;
    const present = total - absent - excused;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { total, present, absent, excused, percentage };
  };

  // Calculate incidents summary
  const getIncidentsSummary = () => {
    if (!studentIncidents || studentIncidents.length === 0) {
      return { total: 0, recent: 0 };
    }
    
    const total = studentIncidents.length;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recent = studentIncidents.filter(incident => 
      new Date(incident.date) > thirtyDaysAgo
    ).length;
    
    return { total, recent };
  };

  // Calculate performance summary
  const getPerformanceSummary = () => {
    if (!studentMarks || studentMarks.length === 0) {
      return { 
        averageGrade: 0, 
        totalSubjects: 0, 
        excellentGrades: 0, 
        needsImprovement: 0,
        totalMarks: 0
      };
    }
    
    const totalMarks = studentMarks.length;
    const averageGrade = totalMarks > 0 ? Math.round(
      studentMarks.reduce((sum, mark) => sum + mark.mark, 0) / totalMarks
    ) : 0;
    
    const uniqueSubjects = [...new Set(studentMarks.map(mark => mark.subject_name))].length;
    
    const excellentGrades = studentMarks.filter(mark => mark.mark >= 90).length;
    const needsImprovement = studentMarks.filter(mark => mark.mark < 60).length;
    
    return { 
      averageGrade, 
      totalSubjects: uniqueSubjects, 
      excellentGrades, 
      needsImprovement,
      totalMarks
    };
  };


  const attendanceSummary = getAttendanceSummary();
  const incidentsSummary = getIncidentsSummary();
  const performanceSummary = getPerformanceSummary();

  return (
    <Card elevation={4} sx={{ backgroundColor: 'transparent' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            borderRadius: 2,
            p: 1.5,
            mr: 2,
            boxShadow: `0 4px 12px ${theme.palette.secondary.main}40`,
          }}>
            <School sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
            Academic Section
          </Typography>
        </Box>

        <Stack spacing={1}>
          {/* Attendance Accordion */}
          <Accordion 
            expanded={expandedSections.attendance} 
            onChange={() => handleToggleSection('attendance')}
            sx={{ boxShadow: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <EventNote sx={{ color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                  Attendance Records
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip 
                    label={`${attendanceSummary.percentage}%`} 
                    color={attendanceSummary.percentage >= 80 ? 'success' : attendanceSummary.percentage >= 60 ? 'warning' : 'error'}
                    size="small"
                  />
                  <Chip 
                    label={`${attendanceSummary.present}/${attendanceSummary.total}`} 
                    color="default"
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              )}
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              {!loading && !error && studentAttendances.length === 0 && (
                <Alert severity="info">
                  No attendance records found for this student.
                </Alert>
              )}
              
              {!loading && !error && studentAttendances.length > 0 && (
                <Box>
                  {/* Summary Stats */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: theme.palette.success.light + '20', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
                          {attendanceSummary.present}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Present</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: theme.palette.error.light + '20', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ color: theme.palette.error.main, fontWeight: 700 }}>
                          {attendanceSummary.absent}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Absent</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: theme.palette.warning.light + '20', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ color: theme.palette.warning.main, fontWeight: 700 }}>
                          {attendanceSummary.excused}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Excused</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: theme.palette.info.light + '20', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ color: theme.palette.info.main, fontWeight: 700 }}>
                          {attendanceSummary.total}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Total Days</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Progress Bar */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Attendance Rate</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {attendanceSummary.percentage}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={attendanceSummary.percentage} 
                      color={attendanceSummary.percentage >= 80 ? 'success' : attendanceSummary.percentage >= 60 ? 'warning' : 'error'}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  {/* Detailed Table */}
                  <TableContainer component={Paper} elevation={2}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Note</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentAttendances.map((attendance, index) => {
                          const status = getAttendanceStatus(attendance.absent, attendance.excused);
                          return (
                            <TableRow key={index}>
                              <TableCell>{formatDate(attendance.date)}</TableCell>
                              <TableCell>
                                <Chip
                                  label={status.label}
                                  color={status.color}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{attendance.note || '-'}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Incidents Accordion */}
          <Accordion 
            expanded={expandedSections.incidents} 
            onChange={() => handleToggleSection('incidents')}
            sx={{ boxShadow: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Warning sx={{ color: theme.palette.warning.main, mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                  Incidents Records
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip 
                    label={`${incidentsSummary.total} Total`} 
                    color="warning"
                    size="small"
                  />
                  {incidentsSummary.recent > 0 && (
                    <Chip 
                      label={`${incidentsSummary.recent} Recent`} 
                      color="error"
                      size="small"
                    />
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {incidentsLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              )}
              
              {incidentsError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {incidentsError}
                </Alert>
              )}
              
              {!incidentsLoading && !incidentsError && studentIncidents.length === 0 && (
                <Alert severity="info">
                  No incidents found for this student.
                </Alert>
              )}
              
              {!incidentsLoading && !incidentsError && studentIncidents.length > 0 && (
                <TableContainer component={Paper} elevation={2}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Procedure</TableCell>
                        <TableCell>Note</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {studentIncidents.map((incident, index) => (
                        <TableRow key={incident.id || index}>
                          <TableCell>{formatDateTime(incident.date)}</TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {incident.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={incident.procedure}
                              color="warning"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{incident.note || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Performance Accordion */}
          <Accordion 
            expanded={expandedSections.performance} 
            onChange={() => handleToggleSection('performance')}
            sx={{ boxShadow: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <TrendingUp sx={{ color: theme.palette.success.main, mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                  Performance Records
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip 
                    label={`${performanceSummary.averageGrade}% Avg`} 
                    color="success"
                    size="small"
                  />
                  <Chip 
                    label={`${performanceSummary.totalSubjects} Subjects`} 
                    color="default"
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {marksLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              )}
              
              {marksError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {marksError}
                </Alert>
              )}
              
              {!marksLoading && !marksError && studentMarks.length === 0 && (
                <Alert severity="info">
                  No marks found for this student.
                </Alert>
              )}
              
              {!marksLoading && !marksError && studentMarks.length > 0 && (
                <Box>
                  {/* Summary Stats */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: theme.palette.success.light + '20', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
                          {performanceSummary.averageGrade}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Average</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: theme.palette.info.light + '20', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ color: theme.palette.info.main, fontWeight: 700 }}>
                          {performanceSummary.totalSubjects}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Subjects</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: theme.palette.success.light + '20', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
                          {performanceSummary.excellentGrades}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Excellent (90+)</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: theme.palette.error.light + '20', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ color: theme.palette.error.main, fontWeight: 700 }}>
                          {performanceSummary.needsImprovement}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Needs Improvement</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Progress Bar */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Overall Performance</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {performanceSummary.averageGrade}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={performanceSummary.averageGrade} 
                      color={performanceSummary.averageGrade >= 80 ? 'success' : performanceSummary.averageGrade >= 60 ? 'warning' : 'error'}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  {/* Detailed Table */}
                  <TableContainer component={Paper} elevation={2}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Subject</TableCell>
                          <TableCell>Mark Type</TableCell>
                          <TableCell>Mark</TableCell>
                          <TableCell>Top Mark</TableCell>
                          <TableCell>Pass Mark</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentMarks.map((mark, index) => (
                          <TableRow key={mark.id || index}>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {mark.subject_name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={mark.mark_type}
                                color="primary"
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    fontWeight: 700,
                                    color: mark.mark >= 90 ? theme.palette.success.main : 
                                           mark.mark >= 60 ? theme.palette.warning.main : 
                                           theme.palette.error.main
                                  }}
                                >
                                  {mark.mark}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                  /{mark.top_mark}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{mark.top_mark}</TableCell>
                            <TableCell>{mark.pass_mark}</TableCell>
                            <TableCell>{formatDate(mark.date)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AcademicSection;
