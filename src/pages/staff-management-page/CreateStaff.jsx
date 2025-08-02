import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createStaff, updateStaff, fetchEmployeeById } from '../../featuers/staff-slice/staffSlice';
import { fetchSubjects } from '../../featuers/subjects-slice/subjectsSlice';

// Import smaller components
import FormHeader from './components/FormHeader';
import StepRenderer from './components/StepRenderer';
import FormNavigation from './components/FormNavigation';

const CreateStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { loading, error, selectedEmployee } = useSelector((state) => state.staff);
  const { subjects } = useSelector((state) => state.subjects);
  const theme = useTheme();

  const isRTL = i18n.language === 'ar';
  const isEditMode = !!id;

  const steps = [t('personalInformation'), t('workDetails'), t('contractSchedule')];

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    user: {
      username: '',
      password: '',
      phone: '',
      first_name: '',
      last_name: '',
    },
    role: '',
    subjectIDs: [],
    father_name: '',
    mother_name: '',
    nationality: '',
    gender: '',
    address: '',
    birth_date: '',
    family_status: '',
    national_no: '',
    salary: '',
    contract_start: '',
    contract_end: '',
    day_start: '',
    day_end: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchSubjects());

    if (isEditMode && id) {
      dispatch(fetchEmployeeById(id));
    }
  }, [dispatch, isEditMode, id]);

  useEffect(() => {
    if (isEditMode && selectedEmployee) {
      setFormData({
        user: {
          username: selectedEmployee.user.username,
          password: '',
          phone: selectedEmployee.user.phone,
          first_name: selectedEmployee.user.first_name,
          last_name: selectedEmployee.user.last_name,
        },
        role: selectedEmployee.role,
        subjectIDs: selectedEmployee.subjects?.map(s => s.id) || [],
        father_name: selectedEmployee.father_name || '',
        mother_name: selectedEmployee.mother_name || '',
        nationality: selectedEmployee.nationality || '',
        gender: selectedEmployee.gender || '',
        address: selectedEmployee.address || '',
        birth_date: selectedEmployee.birth_date || '',
        family_status: selectedEmployee.family_status || '',
        national_no: selectedEmployee.national_no || '',
        salary: selectedEmployee.salary,
        contract_start: selectedEmployee.contract_start,
        contract_end: selectedEmployee.contract_end,
        day_start: selectedEmployee.day_start,
        day_end: selectedEmployee.day_end,
      });
    }
  }, [isEditMode, selectedEmployee]);

  const handleGoBack = () => {
    if (isEditMode) {
      navigate(`/staff/${id}`);
    } else {
      navigate('/staff');
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = (step) => {
    let newErrors = {};
    let isValid = true;

    switch (step) {
      case 0: // Personal Information
        if (!formData.user.username.trim()) newErrors['user.username'] = t('usernameRequired');
        if (!isEditMode && !formData.user.password.trim()) newErrors['user.password'] = t('passwordRequired');
        if (!formData.user.phone.trim()) newErrors['user.phone'] = t('phoneRequired');
        if (!formData.user.first_name.trim()) newErrors['user.first_name'] = t('firstNameRequired');
        if (!formData.user.last_name.trim()) newErrors['user.last_name'] = t('lastNameRequired');
        if (!formData.national_no.trim()) newErrors.national_no = t('nationalNoRequired');
        if (!formData.father_name.trim()) newErrors.father_name = t('fatherNameRequired');
        if (!formData.mother_name.trim()) newErrors.mother_name = t('motherNameRequired');
        if (!formData.nationality.trim()) newErrors.nationality = t('nationalityRequired');
        if (!formData.gender) newErrors.gender = t('genderRequired');
        if (!formData.birth_date) newErrors.birth_date = t('birthDateRequired');
        if (!formData.family_status) newErrors.family_status = t('familyStatusRequired');
        if (!formData.address.trim()) newErrors.address = t('addressRequired');
        break;
      case 1: // Work Details
        if (!formData.role) newErrors.role = t('roleRequired');
        if (!formData.salary.trim()) newErrors.salary = t('salaryRequired');
        if (formData.role === 'teacher' && formData.subjectIDs.length === 0) {
          newErrors.subjectIDs = t('atLeastOneSubjectRequired');
        }
        break;
      case 2: // Contract & Schedule
        if (!formData.contract_start) newErrors.contract_start = t('contractStartRequired');
        if (!formData.contract_end) newErrors.contract_end = t('contractEndRequired');
        if (!formData.day_start) newErrors.day_start = t('dayStartRequired');
        if (!formData.day_end) newErrors.day_end = t('dayEndRequired');
        break;
    }

    setErrors(newErrors);
    isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) {
      return;
    }
    
    const submitData = { ...formData };
    if (submitData.role !== 'teacher') {
      delete submitData.subjectIDs;
    }

    if (isEditMode && !submitData.user.password.trim()) {
      delete submitData.user.password;
    }

    let resultAction;
    if (isEditMode) {
      resultAction = await dispatch(updateStaff({ id, data: submitData }));
    } else {
      resultAction = await dispatch(createStaff(submitData));
    }

    if (isEditMode && updateStaff.fulfilled.match(resultAction)) {
      navigate(`/staff/${id}`);
    } else if (!isEditMode && createStaff.fulfilled.match(resultAction)) {
      navigate('/staff');
    }
  };

  if (isEditMode && !selectedEmployee) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{
      p: 3,
      maxWidth: 1200,
      mx: 'auto',
      ...(isRTL && { direction: 'rtl', textAlign: 'right' })
    }}>
      <FormHeader isEditMode={isEditMode} onGoBack={handleGoBack} />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4 }}>
          <StepRenderer
            step={activeStep}
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            isEditMode={isEditMode}
            subjects={subjects}
          />
        </Box>

        <FormNavigation
          activeStep={activeStep}
          steps={steps}
          loading={loading}
          isEditMode={isEditMode}
          onBack={handleBack}
          onNext={handleNext}
          onCancel={handleGoBack}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};

export default CreateStaff;  