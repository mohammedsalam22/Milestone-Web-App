import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Box,
  Avatar,
  Chip,
  Skeleton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Male,
  Female,
  CheckCircle,
  Cancel,
  Schedule,
} from '@mui/icons-material';
import PlacementTest from '../../../models/PlacementTest';

const PlacementTestsTable = ({ placementTests }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get filter values from header (you'll need to lift state up or use context)
  const searchTerm = useSelector(state => state.placementTests.searchTerm || '');
  const selectedResult = useSelector(state => state.placementTests.selectedResult || '');
  const selectedReligion = useSelector(state => state.placementTests.selectedReligion || '');

  // Filter placement tests
  const filteredPlacementTests = useMemo(() => {
    return placementTests.filter(test => {
      const placementTestModel = new PlacementTest(test);
      const studentName = placementTestModel.getStudentFullName().toLowerCase();
      const matchesSearch = !searchTerm || studentName.includes(searchTerm.toLowerCase());
      const matchesResult = !selectedResult || placementTestModel.getResultStatus() === selectedResult;
      const matchesReligion = !selectedReligion || test.student_religion === selectedReligion;

      return matchesSearch && matchesResult && matchesReligion;
    });
  }, [placementTests, searchTerm, selectedResult, selectedReligion]);

  // Pagination
  const paginatedPlacementTests = filteredPlacementTests.slice(
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

  const getGenderIcon = (gender) => {
    return gender?.toLowerCase() === 'male' ? <Male /> : <Female />;
  };

  const getGenderColor = (gender) => {
    return gender?.toLowerCase() === 'male' ? 'primary' : 'secondary';
  };

  const getResultIcon = (placementResult) => {
    const placementTestModel = new PlacementTest({ placement_result: placementResult });
    const status = placementTestModel.getResultStatus();
    switch (status) {
      case 'passed':
        return <CheckCircle />;
      case 'failed':
        return <Cancel />;
      default:
        return <Schedule />;
    }
  };

  const getResultColor = (placementResult) => {
    const placementTestModel = new PlacementTest({ placement_result: placementResult });
    const status = placementTestModel.getResultStatus();
    switch (status) {
      case 'passed':
        return 'success';
      case 'failed':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
              <TableCell>Student</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Religion</TableCell>
              <TableCell>Test Result</TableCell>
              <TableCell>Parent 1</TableCell>
              <TableCell>Parent 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPlacementTests.length > 0 ? (
              paginatedPlacementTests.map((placementTest) => {
                const placementTestModel = new PlacementTest(placementTest);
                const studentName = placementTestModel.getStudentFullName();
                const resultStatus = placementTestModel.getResultStatus();
                
                return (
                  <TableRow
                    key={placementTest.id}
                    hover
                    onClick={() => navigate(`/placement-tests/${placementTest.id}`)}
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
                          {studentName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="medium">
                            {studentName}
                          </Typography>
                                                  <Typography variant="body2" color="text.secondary">
                          {placementTestModel.getStudentNationality()}
                        </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getGenderIcon(placementTest.student_card?.gender)}
                        label={placementTest.student_card?.gender || 'N/A'}
                        color={getGenderColor(placementTest.student_card?.gender)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {placementTestModel.getStudentBirthDate()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {placementTestModel.getAge()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {placementTest.student_religion || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getResultIcon(placementTest.placement_result)}
                        label={resultStatus.charAt(0).toUpperCase() + resultStatus.slice(1)}
                        color={getResultColor(placementTest.placement_result)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {placementTestModel.getParent1FullName()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {placementTest.parent1_job || 'N/A'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {placementTestModel.getParent2FullName()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {placementTest.parent2_job || 'N/A'}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No placement test registrants found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchTerm || selectedResult || selectedReligion
                      ? 'Try adjusting your search criteria or filters.'
                      : 'No students are currently registered for placement tests.'}
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
        count={filteredPlacementTests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PlacementTestsTable; 