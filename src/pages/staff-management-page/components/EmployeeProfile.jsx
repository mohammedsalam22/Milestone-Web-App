import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Avatar,
  Chip,
  Button,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  useTheme,
  Container,
  Stack,
  Badge,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
  Business as BusinessIcon,
  ContactPhone as ContactPhoneIcon,
  Home as HomeIcon,
  Flag as FlagIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchEmployeeById, deleteStaff } from '../../../featuers/staff-slice/staffSlice';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { selectedEmployee, loading, error } = useSelector((state) => state.staff);
  const theme = useTheme();

  // RTL support
  const isRTL = i18n.language === 'ar';
  const BackIcon = isRTL ? ArrowForwardIcon : ArrowBackIcon;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id));
    }
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate('/staff');
  };

  const handleEdit = () => {
    navigate(`/staff/create/${id}`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    const resultAction = await dispatch(deleteStaff(selectedEmployee.id));
    if (deleteStaff.fulfilled.match(resultAction)) {
      setShowDeleteDialog(false);
      navigate('/staff');
    }
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.slice(0, 5) : '';
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : '';
  };

  const getRoleColor = (role) => {
    const colors = {
      teacher: 'primary',
      admin: 'error',
      cooperator: 'warning',
      receptionist: 'info',
    };
    return colors[role] || 'default';
  };

  const getRoleIcon = (role) => {
    const icons = {
      teacher: <SchoolIcon />,
      admin: <BusinessIcon />,
      cooperator: <WorkIcon />,
      receptionist: <ContactPhoneIcon />,
    };
    return icons[role] || <PersonIcon />;
  };

  if (loading && !selectedEmployee) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button onClick={handleGoBack} variant="outlined" startIcon={<BackIcon />}>
          {t('back')}
        </Button>
      </Container>
    );
  }

  if (!selectedEmployee) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          Employee not found
        </Typography>
        <Button onClick={handleGoBack} variant="outlined" startIcon={<BackIcon />} sx={{ mt: 2 }}>
          {t('back')}
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Header with Back Button and Actions */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <Button
              onClick={handleGoBack}
              variant="outlined"
              startIcon={<BackIcon />}
              sx={{ borderRadius: 2 }}
            >
              {t('backToStaff')}
            </Button>
          </Box>
          
          {/* Action Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              onClick={handleEdit}
              variant="contained"
              startIcon={<EditIcon />}
              sx={{ borderRadius: 2 }}
            >
              {t('edit')}
            </Button>
            <Button
              onClick={handleDelete}
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              sx={{ borderRadius: 2 }}
            >
              {t('delete')}
            </Button>
          </Stack>
        </Box>

        {/* Hero Section */}
        <Box sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          p: 4,
          borderRadius: 2,
          mb: 4,
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4,
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Box sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.success.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white'
                }}>
                  <VerifiedIcon sx={{ fontSize: 10, color: 'white' }} />
                </Box>
              }
            >
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                {selectedEmployee.user.first_name.charAt(0)}
              </Avatar>
            </Badge>
            
            <Box>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                mb: 1
              }}>
                {selectedEmployee.user.first_name} {selectedEmployee.user.last_name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip
                  icon={getRoleIcon(selectedEmployee.role)}
                  label={t(selectedEmployee.role)}
                  color={getRoleColor(selectedEmployee.role)}
                  size="large"
                  sx={{ 
                    textTransform: 'capitalize', 
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                />
                <Chip
                  icon={<StarIcon />}
                  label="Active"
                  color="success"
                  size="medium"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400, mb: 1 }}>
                {selectedEmployee.user.username} • {selectedEmployee.user.phone}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 400 }}>
                  {selectedEmployee.address}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Content Sections */}
        <Grid container spacing={6}>
          {/* Personal Details */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ 
              p: 4,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 4,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PersonIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {t('personalDetails')}
                </Typography>
              </Box>
              
              <Stack spacing={3}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <PersonIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {t('fatherName')}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {selectedEmployee.father_name}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <FavoriteIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {t('motherName')}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {selectedEmployee.mother_name}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <FlagIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {t('nationality')}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {selectedEmployee.nationality}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <PersonIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {t('gender')}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {t(selectedEmployee.gender)}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <HomeIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {t('familyStatus')}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {t(selectedEmployee.family_status)}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Work Details */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ 
              p: 4,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 4,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <WorkIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {t('workDetails')}
                </Typography>
              </Box>
              
              <Stack spacing={3}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <AccessTimeIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {t('workingHours')}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {formatTime(selectedEmployee.day_start)} - {formatTime(selectedEmployee.day_end)}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <MoneyIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {t('salary')}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 700, 
                      mt: 0.5,
                      color: theme.palette.success.main,
                      fontSize: '1.2rem'
                    }}>
                      ${selectedEmployee.salary}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <CalendarIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {t('contractPeriod')}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {formatDate(selectedEmployee.contract_start)} - {formatDate(selectedEmployee.contract_end)}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <PersonIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {t('nationalNo')}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {selectedEmployee.national_no}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ 
              p: 4,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 4,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <ContactPhoneIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Contact Information
                </Typography>
              </Box>
              
              <Stack spacing={3}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <PhoneIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Phone
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {selectedEmployee.user.phone}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <EmailIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Username
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {selectedEmployee.user.username}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <CalendarIcon sx={{ color: theme.palette.text.secondary }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Birth Date
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {formatDate(selectedEmployee.birth_date)}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Subjects */}
          {selectedEmployee.subjects && selectedEmployee.subjects.length > 0 && (
            <Grid item xs={12}>
              <Box sx={{ 
                p: 4,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  mb: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <SchoolIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {t('subjects')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {selectedEmployee.subjects.map((subject) => (
                    <Chip
                      key={subject.id}
                      label={subject.name}
                      variant="outlined"
                      size="large"
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '1rem',
                        py: 1,
                        px: 2,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('deleteEmployee')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('deleteConfirmation')} {selectedEmployee.user.first_name} {selectedEmployee.user.last_name}
            {t('deleteConfirmationEnd')}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setShowDeleteDialog(false)} 
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            {t('cancel')}
          </Button>
          <Button 
            onClick={confirmDelete} 
            variant="contained" 
            color="error"
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            {loading ? t('deleting') : t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeProfile; 