import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { createStudentDirect, updateStudent } from '../../featuers/students-slice/studentsSlice';
import { fetchSections } from '../../featuers/sections-slice/sectionsSlice';
import AccountInformation from './components/AccountInformation';
import StudentPersonalInformation from './components/StudentPersonalInformation';
import ParentInformation from './components/ParentInformation';
import ConfirmationDialog from './components/ConfirmationDialog';

const steps = [
  'Account Information',
  'Student Personal Information',
  'Parent 1 Information',
  'Parent 2 Information',
];

const StudentForm = ({ isEditing = false, studentData = null, onCancel, onSuccess }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.students);
  const { sections } = useSelector((state) => state.sections);

  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState(() => {
    if (isEditing && studentData) {
      return {
        // Account Information
        username: studentData.user?.username || '',
        password: '', // Don't populate password for editing
        religion: studentData.religion || '',
        section_id: studentData.section?.id || '',

        // Student Personal Information
        card: {
          first_name: studentData.card?.first_name || '',
          last_name: studentData.card?.last_name || '',
          phone: studentData.card?.phone || '',
          nationality: studentData.card?.nationality || '',
          gender: studentData.card?.gender || '',
          birth_date: studentData.card?.birth_date || '',
          birth_city: studentData.card?.birth_city || '',
          address: studentData.card?.address || '',
          place_of_register: studentData.card?.place_of_register || '',
          national_no: studentData.card?.national_no || '',
        },

        // Parent 1 Information
        parent1_job: studentData.parent1?.job || '',
        parent1_card: {
          first_name: studentData.parent1?.card?.first_name || '',
          last_name: studentData.parent1?.card?.last_name || '',
          phone: studentData.parent1?.card?.phone || '',
          nationality: studentData.parent1?.card?.nationality || '',
          gender: studentData.parent1?.card?.gender || '',
          birth_date: studentData.parent1?.card?.birth_date || '',
          birth_city: studentData.parent1?.card?.birth_city || '',
          address: studentData.parent1?.card?.address || '',
          place_of_register: studentData.parent1?.card?.place_of_register || '',
          national_no: studentData.parent1?.card?.national_no || '',
        },

        // Parent 2 Information
        parent2_job: studentData.parent2?.job || '',
        parent2_card: {
          first_name: studentData.parent2?.card?.first_name || '',
          last_name: studentData.parent2?.card?.last_name || '',
          phone: studentData.parent2?.card?.phone || '',
          nationality: studentData.parent2?.card?.nationality || '',
          gender: studentData.parent2?.card?.gender || '',
          birth_date: studentData.parent2?.card?.birth_date || '',
          birth_city: studentData.parent2?.card?.birth_city || '',
          address: studentData.parent2?.card?.address || '',
          place_of_register: studentData.parent2?.card?.place_of_register || '',
          national_no: studentData.parent2?.card?.national_no || '',
        },
      };
    } else {
      return {
        // Account Information
        username: '',
        password: '',
        religion: '',
        section_id: '',

        // Student Personal Information
        card: {
          first_name: '',
          last_name: '',
          phone: '',
          nationality: '',
          gender: '',
          birth_date: '',
          birth_city: '',
          address: '',
          place_of_register: '',
          national_no: '',
        },

        // Parent 1 Information
        parent1_job: '',
        parent1_card: {
          first_name: '',
          last_name: '',
          phone: '',
          nationality: '',
          gender: '',
          birth_date: '',
          birth_city: '',
          address: '',
          place_of_register: '',
          national_no: '',
        },

        // Parent 2 Information
        parent2_job: '',
        parent2_card: {
          first_name: '',
          last_name: '',
          phone: '',
          nationality: '',
          gender: '',
          birth_date: '',
          birth_city: '',
          address: '',
          place_of_register: '',
          national_no: '',
        },
      };
    }
  });

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);



  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
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
      
      if (isEditing) {
        // Remove password if it's empty (don't update password)
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        
        await dispatch(updateStudent({ id: studentData.id, data: updateData })).unwrap();
        setSuccessMessage('Student updated successfully!');
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1000);
        } else {
          setTimeout(() => {
            navigate('/students');
          }, 2000);
        }
      } else {
        await dispatch(createStudentDirect(formData)).unwrap();
        setSuccessMessage('Student created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/students');
        }, 2000);
      }
    } catch (error) {
      console.error(isEditing ? 'Failed to update student:' : 'Failed to create student:', error);
    }
  };

  const isStepValid = (step) => {
    const isValidPhone = (phone) => /^09\d{8}$/.test(phone);
    const isValidNationalNo = (nationalNo) => nationalNo && nationalNo.length === 13;
    
    switch (step) {
             case 0:
         return formData.username && formData.username.length >= 3 && 
                (!isEditing || (formData.password && formData.password.length >= 8)) && 
                formData.religion && formData.section_id;
      case 1:
        return formData.card.first_name && formData.card.last_name && 
               formData.card.phone && isValidPhone(formData.card.phone) &&
               formData.card.nationality && formData.card.gender && formData.card.birth_date &&
               formData.card.birth_city && formData.card.address && formData.card.place_of_register &&
               formData.card.national_no && isValidNationalNo(formData.card.national_no);
      case 2:
        return formData.parent1_job && formData.parent1_card.first_name && 
               formData.parent1_card.last_name && formData.parent1_card.phone &&
               isValidPhone(formData.parent1_card.phone) &&
               formData.parent1_card.nationality && formData.parent1_card.gender &&
               formData.parent1_card.birth_date && formData.parent1_card.birth_city &&
               formData.parent1_card.address && formData.parent1_card.place_of_register &&
               formData.parent1_card.national_no && isValidNationalNo(formData.parent1_card.national_no);
      case 3:
        return formData.parent2_job && formData.parent2_card.first_name &&
               formData.parent2_card.last_name && formData.parent2_card.phone &&
               isValidPhone(formData.parent2_card.phone) &&
               formData.parent2_card.nationality && formData.parent2_card.gender &&
               formData.parent2_card.birth_date && formData.parent2_card.birth_city &&
               formData.parent2_card.address && formData.parent2_card.place_of_register &&
               formData.parent2_card.national_no && isValidNationalNo(formData.parent2_card.national_no);
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
      isEditing={isEditing}
      sections={sections}
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isStepValid={isStepValid}
    />
  );

    const renderStudentInformation = () => (
    <StudentPersonalInformation
      formData={formData}
      handleInputChange={handleInputChange}
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isStepValid={isStepValid}
    />
  );

  const renderParentInformation = (parentNumber) => (
    <ParentInformation
      parentNumber={parentNumber}
      formData={formData}
      handleInputChange={handleInputChange}
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isStepValid={isStepValid}
      loading={loading}
      setShowConfirmDialog={setShowConfirmDialog}
      isEditing={isEditing}
      steps={steps}
    />
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderAccountInformation();
      case 1:
        return renderStudentInformation();
      case 2:
        return renderParentInformation(1);
      case 3:
        return renderParentInformation(2);
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
          onClick={isEditing && onCancel ? onCancel : () => navigate('/students')}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1.5
          }}
        >
          {isEditing ? 'Cancel' : 'Back to Students'}
        </Button>
        <Typography variant="h4" component="h1">
          {isEditing ? 'Edit Student' : 'Add New Student'}
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
         isEditing={isEditing}
         formData={formData}
         sections={sections}
       />
    </Box>
  );
};

export default StudentForm;