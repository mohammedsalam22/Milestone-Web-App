import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Avatar,
  Skeleton,
  Button,
} from '@mui/material';
import {
  Search,
  Male,
  Female,
  FilterList,
  Add,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { fetchStudents } from '../../featuers/students-slice/studentsSlice';
import Student from '../../models/Student';

const Students = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRegistrationStatus, setSelectedRegistrationStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Get unique grades for filter
  const grades = [...new Set(students.map(student => student.section?.grade?.name).filter(Boolean))];
  const genders = ['male', 'female'];

  // Filter students based on search term and filters
  const filteredStudents = students.filter(student => {
    const studentModel = new Student(student);
    const fullName = studentModel.getFullName().toLowerCase();
    const grade = student.section?.grade?.name || '';
    const gender = student.card?.gender?.toLowerCase() || '';
    const isRegistered = student.register_date ? 'registered' : 'unregistered';

    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         student.card?.birth_city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !selectedGrade || grade === selectedGrade;
    const matchesGender = !selectedGender || gender === selectedGender.toLowerCase();
    const matchesRegistrationStatus = !selectedRegistrationStatus || isRegistered === selectedRegistrationStatus;

    return matchesSearch && matchesGrade && matchesGender && matchesRegistrationStatus;
  });

  // Pagination
  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
    setPage(0);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setPage(0);
  };

  const handleRegistrationStatusChange = (event) => {
    setSelectedRegistrationStatus(event.target.value);
    setPage(0);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGrade('');
    setSelectedGender('');
    setSelectedRegistrationStatus('');
    setPage(0);
  };

  const getGenderIcon = (gender) => {
    return gender?.toLowerCase() === 'male' ? <Male color="primary" /> : <Female color="secondary" />;
  };

  const getGenderColor = (gender) => {
    return gender?.toLowerCase() === 'male' ? 'primary' : 'secondary';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Box sx={{
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Management
        </Typography>
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  return (
    <Box sx={{
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Student Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/students/create')}
        >
          Add Student
        </Button>
      </Box>

             {/* Search and Filters */}
       <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: 'transparent' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by name or birth city..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Grade</InputLabel>
            <Select
              value={selectedGrade}
              label="Grade"
              onChange={handleGradeChange}
            >
              <MenuItem value="">All Grades</MenuItem>
              {grades.map((grade) => (
                <MenuItem key={grade} value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
                     <FormControl sx={{ minWidth: 150 }}>
             <InputLabel>Gender</InputLabel>
             <Select
               value={selectedGender}
               label="Gender"
               onChange={handleGenderChange}
             >
               <MenuItem value="">All Genders</MenuItem>
               {genders.map((gender) => (
                 <MenuItem key={gender} value={gender}>
                   {gender.charAt(0).toUpperCase() + gender.slice(1)}
                 </MenuItem>
               ))}
             </Select>
           </FormControl>

           <FormControl sx={{ minWidth: 150 }}>
             <InputLabel>Registration Status</InputLabel>
             <Select
               value={selectedRegistrationStatus}
               label="Registration Status"
               onChange={handleRegistrationStatusChange}
             >
               <MenuItem value="">All Students</MenuItem>
               <MenuItem value="registered">Registered</MenuItem>
               <MenuItem value="unregistered">Unregistered</MenuItem>
             </Select>
           </FormControl>

           {(searchTerm || selectedGrade || selectedGender || selectedRegistrationStatus) && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearFilters}
              size="small"
            >
              Clear Filters
            </Button>
          )}
        </Box>

        {/* Active Filters */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
          {searchTerm && (
            <Chip
              label={`Search: ${searchTerm}`}
              onDelete={() => setSearchTerm('')}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          {selectedGrade && (
            <Chip
              label={`Grade: ${selectedGrade}`}
              onDelete={() => setSelectedGrade('')}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
                     {selectedGender && (
             <Chip
               label={`Gender: ${selectedGender}`}
               onDelete={() => setSelectedGender('')}
               color="primary"
               variant="outlined"
               size="small"
             />
           )}
           {selectedRegistrationStatus && (
             <Chip
               label={`Status: ${selectedRegistrationStatus.charAt(0).toUpperCase() + selectedRegistrationStatus.slice(1)}`}
               onDelete={() => setSelectedRegistrationStatus('')}
               color="primary"
               variant="outlined"
               size="small"
             />
           )}
        </Box>
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results Count */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredStudents.length} of {students.length} students
        </Typography>
      </Box>

      {/* Students Table */}
      <Paper elevation={2}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                <TableCell>Student</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>Birth City</TableCell>
                <TableCell>Grade & Section</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => {
                  const studentModel = new Student(student);
                  return (
                    <TableRow
                      key={student.id}
                      hover
                      onClick={() => navigate(`/students/${student.id}`)}
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: theme.palette.primary.main,
                            }}
                          >
                            {studentModel.getFullName().charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="medium">
                              {studentModel.getFullName()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {student.user?.username}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getGenderIcon(student.card?.gender)}
                          label={studentModel.getFormattedGender()}
                          color={getGenderColor(student.card?.gender)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(student.card?.birth_date)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {student.card?.birth_city || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {student.section?.grade?.name || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Section {student.section?.name || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {studentModel.getAge() || 'N/A'} years
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No students found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchTerm || selectedGrade || selectedGender
                        ? 'Try adjusting your search criteria or filters.'
                        : 'No students are currently registered.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Students;