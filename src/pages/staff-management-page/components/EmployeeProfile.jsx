import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Avatar,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  useTheme,
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

  if (loading && !selectedEmployee) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        p: 3,
        ...(isRTL && { direction: 'rtl', textAlign: 'right' })
      }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button onClick={handleGoBack} variant="outlined" startIcon={<BackIcon />}>
          {t('back')}
        </Button>
      </Box>
    );
  }

  if (!selectedEmployee) {
    return (
      <Box sx={{ 
        p: 3,
        ...(isRTL && { direction: 'rtl', textAlign: 'right' })
      }}>
        <Typography variant="h6" color="error">
          Employee not found
        </Typography>
        <Button onClick={handleGoBack} variant="outlined" startIcon={<BackIcon />} sx={{ mt: 2 }}>
          {t('back')}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3,
      ...(isRTL && { direction: 'rtl', textAlign: 'right' })
    }}>
      {/* Header with Back Button and Actions */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3
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
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 700,
            ...(isRTL && { textAlign: 'right' }),
            ...(!isRTL && { textAlign: 'left' })
          }}>
            {t('employeeProfile')}
          </Typography>
        </Box>
        
        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <Button
            onClick={handleEdit}
            variant="outlined"
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
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 3, 
                mb: 3,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: theme.palette.primary.main, fontSize: '2rem' }}>
                  {selectedEmployee.user.first_name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {selectedEmployee.user.first_name} {selectedEmployee.user.last_name}
                  </Typography>
                  <Chip
                    label={t(selectedEmployee.role)}
                    color={getRoleColor(selectedEmployee.role)}
                    size="medium"
                    sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                  />
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PersonIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('username')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedEmployee.user.username}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                mb: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PhoneIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('phone')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedEmployee.user.phone}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                mb: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PersonIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('nationalNo')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedEmployee.national_no}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <CalendarIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('birthDate')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatDate(selectedEmployee.birth_date)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                {t('personalDetails')}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PersonIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('fatherName')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedEmployee.father_name}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PersonIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('motherName')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedEmployee.mother_name}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PersonIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('nationality')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedEmployee.nationality}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PersonIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('gender')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {t(selectedEmployee.gender)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PersonIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('familyStatus')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {t(selectedEmployee.family_status)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Work Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                {t('workDetails')}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 3,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <AccessTimeIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('workingHours')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatTime(selectedEmployee.day_start)} - {formatTime(selectedEmployee.day_end)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 3,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <MoneyIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('salary')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                    ${selectedEmployee.salary}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <CalendarIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('contractPeriod')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatDate(selectedEmployee.contract_start)} - {formatDate(selectedEmployee.contract_end)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                {t('addressInformation')}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <PersonIcon sx={{ fontSize: 24, color: 'text.secondary', mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('address')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedEmployee.address}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Subjects */}
        {selectedEmployee.subjects && selectedEmployee.subjects.length > 0 && (
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  mb: 3,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <SchoolIcon sx={{ fontSize: 28, color: 'text.secondary' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
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
                      sx={{ fontWeight: 600 }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
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
        <DialogActions sx={{ p: 2 }}>
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