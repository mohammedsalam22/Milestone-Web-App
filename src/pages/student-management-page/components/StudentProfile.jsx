import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Skeleton,
  Alert,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  Tabs,
  Tab,
  Stack,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  Message,
  Phone,
  Email,
  LocationOn,
  School,
  Person,
  Work,
  Cake,
  Flag,
  AutoAwesome,
  CalendarToday,
  AttachMoney,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { fetchStudentById, deleteStudent } from '../../../featuers/students-slice/studentsSlice';
import Student from '../../../models/Student';
import AcademicSection from './AcademicSection';
import FinancialSection from './FinancialSection';
import StudentForm from '../../student-form-page/StudentForm';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const { selectedStudent, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentById(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      navigate('/students');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteStudent(id)).unwrap();
      navigate('/students');
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const formatParentBirthDate = (birthDate) => {
    return birthDate ? new Date(birthDate).toLocaleDateString() : 'N/A';
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!selectedStudent) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Student not found</Alert>
      </Box>
    );
  }

  const student = new Student(selectedStudent);

  if (isEditing) {
    return (
      <StudentForm 
        isEditing={true} 
        studentData={selectedStudent} 
        onCancel={() => setIsEditing(false)}
        onSuccess={() => {
          setIsEditing(false);
          dispatch(fetchStudentById(id));
        }}
      />
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            Student Profile
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={handleEdit}
            sx={{ textTransform: 'none' }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleDelete}
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Card sx={{ borderRadius: 0, overflow: 'hidden', boxShadow: 1 }}>
        <CardContent sx={{ p: 0 }}>
          {/* Student Header */}
          <Box sx={{ 
            backgroundColor: 'white',
            p: 4,
            color: theme.palette.text.primary,
            position: 'relative',
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      mb: 2,
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: theme.palette.grey[100],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {student.getPhotoUrl() ? (
                      <img
                        src={student.getPhotoUrl()}
                        alt={student.getFullName()}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <Box
                      sx={{
                        display: student.getPhotoUrl() ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: theme.palette.text.secondary
                      }}
                    >
                      {student.getFullName().charAt(0)}
                    </Box>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {student.getFullName()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, mr: 0.5, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {student.card?.birth_city || 'Location not specified'}
                    </Typography>
                  </Box>
                  <Chip
                    label={student.section?.name || 'No Section'}
                    sx={{ 
                      bgcolor: theme.palette.primary.main, 
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    {student.getFullName()}
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                    Student • {student.section?.grade?.name || 'No Grade'}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Message />}
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Send Message
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Phone />}
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Contact
                    </Button>
                  </Box>

                  {/* Tabs */}
                                  <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 600,
                      minHeight: 48,
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: theme.palette.primary.main,
                      height: 3,
                    },
                  }}
                >
                  <Tab label="Personal Info" icon={<Person />} iconPosition="start" />
                  <Tab label="Academic Info" icon={<School />} iconPosition="start" />
                  <Tab label="Financial Info" icon={<AttachMoney />} iconPosition="start" />
                  <Tab label="Father Info" icon={<Person />} iconPosition="start" />
                  <Tab label="Mother Info" icon={<Person />} iconPosition="start" />
                </Tabs>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Content Area */}
          <Box sx={{ p: 4 }}>
            {/* Information Cards Section */}
            <Box sx={{ mb: 2 }}>
              <Box>
                {activeTab === 0 && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
                      Personal Information
                    </Typography>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Cake sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Birthday</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.getFormattedBirthDate()}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Flag sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Nationality</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.getFormattedNationality()}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AutoAwesome sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Religion</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.getFormattedReligion()}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Birth City</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.card?.birth_city || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">National ID</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.card?.national_no || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Phone sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Phone</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.card?.phone || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Email sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Email</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.email || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Person sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Gender</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.card?.gender || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
                      Academic Information
                    </Typography>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <School sx={{ color: theme.palette.secondary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Study Stage</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.section?.grade?.study_stage?.name || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <School sx={{ color: theme.palette.secondary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Grade</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.section?.grade?.name || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <School sx={{ color: theme.palette.secondary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Section</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.section?.name || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ color: theme.palette.secondary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Study Year</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.section?.grade?.study_year?.name || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Work sx={{ color: theme.palette.secondary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Student ID</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.id || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ color: theme.palette.secondary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Enrollment Date</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.created_at ? new Date(student.created_at).toLocaleDateString() : 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Person sx={{ color: theme.palette.secondary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Status</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.is_active ? 'Active' : 'Inactive'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn sx={{ color: theme.palette.secondary.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Address</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.card?.address || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                )}

                {activeTab === 2 && (
                  <FinancialSection studentId={student.id} />
                )}

                {activeTab === 3 && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
                      Father Information
                    </Typography>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Person sx={{ color: theme.palette.info.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Name</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.getParent1Name()}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Work sx={{ color: theme.palette.info.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Job</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent1?.job || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Phone sx={{ color: theme.palette.info.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Phone</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent1?.card?.phone || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Email sx={{ color: theme.palette.info.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Email</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent1?.email || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Flag sx={{ color: theme.palette.info.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Nationality</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent1?.card?.nationality || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Cake sx={{ color: theme.palette.info.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Birth Date</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {formatParentBirthDate(student.parent1?.card?.birth_date)}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn sx={{ color: theme.palette.info.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Birth City</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent1?.card?.birth_city || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ color: theme.palette.info.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">National ID</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent1?.card?.national_no || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                )}

                {activeTab === 4 && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
                      Mother Information
                    </Typography>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Person sx={{ color: theme.palette.warning.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Name</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.getParent2Name()}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Work sx={{ color: theme.palette.warning.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Job</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent2?.job || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Phone sx={{ color: theme.palette.warning.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Phone</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent2?.card?.phone || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Email sx={{ color: theme.palette.warning.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Email</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent2?.email || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Flag sx={{ color: theme.palette.warning.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Nationality</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent2?.card?.nationality || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Cake sx={{ color: theme.palette.warning.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Birth Date</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {formatParentBirthDate(student.parent2?.card?.birth_date)}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn sx={{ color: theme.palette.warning.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Birth City</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent2?.card?.birth_city || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ color: theme.palette.warning.main, mr: 2, fontSize: 20 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">National ID</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {student.parent2?.card?.national_no || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Academic Section */}
            <Box>
              <AcademicSection student={student} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentProfile; 