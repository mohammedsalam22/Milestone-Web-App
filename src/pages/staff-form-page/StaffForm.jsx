import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import {
  ArrowBack,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { createStaff, updateStaff, fetchEmployeeById } from '../../featuers/staff-slice/staffSlice';
import { fetchSubjects } from '../../featuers/subjects-slice/subjectsSlice';
import AccountInformation from './components/AccountInformation';
import PersonalInformation from './components/PersonalInformation';
import WorkDetails from './components/WorkDetails';
import ContractSchedule from './components/ContractSchedule';
import ConfirmationDialog from './components/ConfirmationDialog';

const steps = [
  'Account Information',
  'Personal Information',
  'Work Details',
  'Contract & Schedule',
];

const StaffForm = ({ isEditing = false, staffData = null, onCancel, onSuccess }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, selectedEmployee } = useSelector((state) => state.staff);
  const { subjects } = useSelector((state) => state.subjects);

  // Determine if we're in editing mode based on URL parameter or prop
  const isEditMode = isEditing || !!id;

  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState(() => {
    if (isEditMode && (staffData || selectedEmployee)) {
      const data = staffData || selectedEmployee;
      return {
        // Account Information
        username: data.user?.username || '',
        password: '', // Don't populate password for editing
        phone: data.user?.phone || '',
        first_name: data.user?.first_name || '',
        last_name: data.user?.last_name || '',

        // Personal Information
        national_no: data.national_no || '',
        father_name: data.father_name || '',
        mother_name: data.mother_name || '',
        nationality: data.nationality || '',
        gender: data.gender || '',
        birth_date: data.birth_date || '',
        family_status: data.family_status || '',
        address: data.address || '',

        // Work Details
        role: data.role || '',
        subjectIDs: data.subjects?.map(s => s.id) || [],
        salary: data.salary || '',

        // Contract & Schedule
        contract_start: data.contract_start || '',
        contract_end: data.contract_end || '',
        day_start: data.day_start || '',
        day_end: data.day_end || '',
      };
    } else {
      return {
        // Account Information
        username: '',
        password: '',
        phone: '',
        first_name: '',
        last_name: '',

        // Personal Information
        national_no: '',
        father_name: '',
        mother_name: '',
        nationality: '',
        gender: '',
        birth_date: '',
        family_status: '',
        address: '',

        // Work Details
        role: '',
        subjectIDs: [],
        salary: '',

        // Contract & Schedule
        contract_start: '',
        contract_end: '',
        day_start: '',
        day_end: '',
      };
    }
  });

  useEffect(() => {
    dispatch(fetchSubjects());
    
    // Fetch employee data if editing
    if (isEditMode && id) {
      dispatch(fetchEmployeeById(id));
    }
  }, [dispatch, isEditMode, id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setShowConfirmDialog(false);
    try {
      setSuccessMessage('');
      
      const submitData = {
        user: {
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
        national_no: formData.national_no,
        father_name: formData.father_name,
        mother_name: formData.mother_name,
        nationality: formData.nationality,
        gender: formData.gender,
        birth_date: formData.birth_date,
        family_status: formData.family_status,
        address: formData.address,
        role: formData.role,
        subjectIDs: formData.role === 'teacher' ? formData.subjectIDs : [],
        salary: formData.salary,
        contract_start: formData.contract_start,
        contract_end: formData.contract_end,
        day_start: formData.day_start,
        day_end: formData.day_end,
      };

      if (isEditMode) {
        // Remove password if it's empty (don't update password)
        if (!submitData.user.password) {
          delete submitData.user.password;
        }
        
        await dispatch(updateStaff({ id: id || staffData.id, data: submitData })).unwrap();
        setSuccessMessage('Staff member updated successfully!');
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1000);
        } else {
          setTimeout(() => {
            navigate('/staff');
          }, 2000);
        }
      } else {
        await dispatch(createStaff(submitData)).unwrap();
        setSuccessMessage('Staff member created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/staff');
        }, 2000);
      }
    } catch (error) {
      console.error(isEditMode ? 'Failed to update staff member:' : 'Failed to create staff member:', error);
    }
  };

  const isStepValid = (step) => {
    const isValidPhone = (phone) => /^09\d{8}$/.test(phone);
    const isValidNationalNo = (nationalNo) => nationalNo && nationalNo.length === 13;
    
    switch (step) {
      case 0:
        return formData.username && formData.username.length >= 3 && 
               (!isEditMode || (formData.password && formData.password.length >= 8)) && 
               formData.phone && isValidPhone(formData.phone) &&
               formData.first_name && formData.last_name;
      case 1:
        return formData.national_no && isValidNationalNo(formData.national_no) &&
               formData.father_name && formData.mother_name &&
               formData.nationality && formData.gender && formData.birth_date &&
               formData.family_status && formData.address;
      case 2:
        return formData.role && formData.role !== 'none' && formData.salary &&
               (formData.role !== 'teacher' || formData.subjectIDs.length > 0);
      case 3:
        return formData.contract_start && formData.contract_end &&
               formData.day_start && formData.day_end;
      default:
        return false;
    }
  };

  const renderAccountInformation = () => (
    <AccountInformation
      formData={formData}
      handleInputChange={handleInputChange}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      isEditing={isEditMode}
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isStepValid={isStepValid}
    />
  );

  const renderPersonalInformation = () => (
    <PersonalInformation
      formData={formData}
      handleInputChange={handleInputChange}
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isStepValid={isStepValid}
    />
  );

  const renderWorkDetails = () => (
    <WorkDetails
      formData={formData}
      handleInputChange={handleInputChange}
      subjects={subjects}
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isStepValid={isStepValid}
    />
  );

  const renderContractSchedule = () => (
    <ContractSchedule
      formData={formData}
      handleInputChange={handleInputChange}
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isStepValid={isStepValid}
      loading={loading}
      setShowConfirmDialog={setShowConfirmDialog}
      isEditing={isEditMode}
      steps={steps}
    />
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderAccountInformation();
      case 1:
        return renderPersonalInformation();
      case 2:
        return renderWorkDetails();
      case 3:
        return renderContractSchedule();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      padding: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <Box sx={{ 
        maxWidth: 1200, 
        mx: 'auto', 
        mb: 4,
        display: 'flex', 
        alignItems: 'center', 
        gap: 3 
      }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={isEditMode && onCancel ? onCancel : () => navigate('/staff')}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1.5
          }}
        >
          {isEditMode ? 'Cancel' : 'Back to Staff'}
        </Button>
        <Typography variant="h4" component="h1">
          {isEditMode ? 'Edit Staff Member' : 'Add New Staff Member'}
        </Typography>
      </Box>

      {/* Error Display */}
      {error && (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 4 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        </Box>
      )}

      {/* Success Display */}
      {successMessage && (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 4 }}>
          <Alert severity="success" sx={{ borderRadius: 2 }}>
            {successMessage}
          </Alert>
        </Box>
      )}

      {/* Stepper */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{ 
                '& .MuiStepLabel-label': {
                  fontSize: '16px',
                  fontWeight: 500
                }
              }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
            Step {activeStep + 1} of {steps.length} - {Math.round(((activeStep + 1) / steps.length) * 100)}% Complete
          </Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box sx={{ mb: 6 }}>
        {renderStepContent(activeStep)}
      </Box>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        showConfirmDialog={showConfirmDialog}
        setShowConfirmDialog={setShowConfirmDialog}
        handleSubmit={handleSubmit}
        isEditing={isEditMode}
        formData={formData}
      />
    </Box>
  );
};

export default StaffForm; 