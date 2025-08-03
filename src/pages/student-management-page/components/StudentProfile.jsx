import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Skeleton,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fetchStudentById, deleteStudent } from '../../../featuers/students-slice/studentsSlice';
import Student from '../../../models/Student';
import StudentProfileHeader from './StudentProfileHeader';
import AcademicPersonalInfo from './AcademicPersonalInfo';
import ParentsInfo from './ParentsInfo';
import StudentForm from '../../student-form-page/StudentForm';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  
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
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <StudentProfileHeader 
        student={student} 
        onBack={handleBack} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {/* Main Content - Simple Padding */}
      <Box sx={{ p: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AcademicPersonalInfo student={student} />
          </Grid>
          <Grid item xs={12}>
            <ParentsInfo student={student} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentProfile; 