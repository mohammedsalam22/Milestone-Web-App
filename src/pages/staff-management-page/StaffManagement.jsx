import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchStaff } from '../../featuers/staff-slice/staffSlice';

const StaffManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { staff, loading, error } = useSelector((state) => state.staff);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();

  // RTL support
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewEmployee = (id) => {
    navigate(`/staff/${id}`);
  };

  const handleCreateStaff = () => {
    navigate('/staff/create');
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.slice(0, 5) : '';
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

  if (loading && staff.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3, 
      ...(isRTL && { 
        direction: 'rtl',
        textAlign: 'right'
      })
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          ...(isRTL && { textAlign: 'right' }),
          ...(!isRTL && { textAlign: 'left' })
        }}>
          {t('staffManagement')}
        </Typography>
        <Button
          variant="contained"
          startIcon={isRTL ? null : <AddIcon />}
          endIcon={isRTL ? <AddIcon /> : null}
          onClick={handleCreateStaff}
          sx={{ 
            borderRadius: 2, 
            px: 3, 
            py: 1, 
            textTransform: 'none', 
            fontWeight: 600
          }}
        >
          {t('createStaff')}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  {t('firstName')}
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  {t('lastName')}
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  {t('role')}
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  {t('workingHours')}
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  {t('view')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staff
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <TableRow
                    key={employee.id}
                    hover
                    sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}
                  >
                    <TableCell>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        flexDirection: isRTL ? 'row-reverse' : 'row'
                      }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: theme.palette.primary.main,
                            fontSize: '1rem',
                          }}
                        >
                          {employee.user.first_name.charAt(0)}
                        </Avatar>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {employee.user.first_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {employee.user.last_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(employee.role)}
                        color={getRoleColor(employee.role)}
                        size="small"
                        sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        flexDirection: isRTL ? 'row-reverse' : 'row'
                      }}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatTime(employee.day_start)} - {formatTime(employee.day_end)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleViewEmployee(employee.id)}
                        color="primary"
                        size="small"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={staff.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('rowsPerPage')}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('of')} ${count}`}
          sx={{
            ...(isRTL && {
              '& .MuiTablePagination-selectLabel': {
                marginRight: 0,
                marginLeft: '16px'
              },
              '& .MuiTablePagination-displayedRows': {
                marginRight: 'auto',
                marginLeft: 0
              },
              '& .MuiTablePagination-actions': {
                marginRight: 'auto',
                marginLeft: 0
              }
            })
          }}
        />
      </Paper>
    </Box>
  );
};

export default StaffManagement;