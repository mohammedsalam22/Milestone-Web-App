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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Get unique grades for filter
  const grades = [...new Set(students.map(student => student.section?.grade?.name).filter(Boolean))];

  // Filter students based on search term and filters
  const filteredStudents = students.filter(student => {
    const studentModel = new Student(student);
    const fullName = studentModel.getFullName().toLowerCase();
    const grade = student.section?.grade?.name || '';

    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         student.card?.birth_city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !selectedGrade || grade === selectedGrade;

    return matchesSearch && matchesGrade;
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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGrade('');
    setPage(0);
  };

  const getGenderIcon = (gender) => {
    return gender?.toLowerCase() === 'male' ? <Male /> : <Female />;
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
      {/* Header with Title and Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Student Management
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by name or birth city..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ 
              minWidth: 250,
              '& .MuiOutlinedInput-root': { borderRadius: 2 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Section</InputLabel>
            <Select
              value={selectedGrade}
              label="Section"
              onChange={handleGradeChange}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="">All Sections</MenuItem>
              {grades.map((grade) => (
                <MenuItem key={grade} value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {(searchTerm || selectedGrade) && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearFilters}
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Clear Filters
            </Button>
          )}
          
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => navigate('/students/create')}
            sx={{ borderRadius: 2 }}
          >
            Add Student
          </Button>
        </Box>
      </Box>

      {/* Active Filters */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
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
            label={`Section: ${selectedGrade}`}
            onDelete={() => setSelectedGrade('')}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Box>

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
                          label={student.card?.gender || 'N/A'}
                          color={getGenderColor(student.card?.gender)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(student.card?.birth_date)}</TableCell>
                      <TableCell>{student.card?.birth_city || 'N/A'}</TableCell>
                      <TableCell>
                        {student.section?.grade?.name && student.section?.name 
                          ? `${student.section.grade.name} - Section ${student.section.name}`
                          : 'N/A'
                        }
                      </TableCell>
                      <TableCell>{studentModel.getAge()}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No students found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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