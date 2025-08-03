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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const theme = useTheme();

  // RTL support
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  // Get unique roles for filter
  const roles = [...new Set(staff.map(employee => employee.role).filter(Boolean))];

  // Filter staff based on search term and filters
  const filteredStaff = staff.filter(employee => {
    const fullName = `${employee.user.first_name} ${employee.user.last_name}`.toLowerCase();
    const role = employee.role || '';

    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         employee.user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || role === selectedRole;

    return matchesSearch && matchesRole;
  });

  // Pagination
  const paginatedStaff = filteredStaff.slice(
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

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setPage(0);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRole('');
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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      ...(isRTL && { 
        direction: 'rtl',
        textAlign: 'right'
      })
    }}>
      {/* Header with Title and Filters */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          ...(isRTL && { textAlign: 'right' }),
          ...(!isRTL && { textAlign: 'left' })
        }}>
          {t('staffManagement')}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by name or email..."
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
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              label="Role"
              onChange={handleRoleChange}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="">All Roles</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {t(role)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {(searchTerm || selectedRole) && (
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
        {selectedRole && (
          <Chip
            label={`Role: ${t(selectedRole)}`}
            onDelete={() => setSelectedRole('')}
            color="secondary"
            variant="outlined"
            size="small"
          />
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results Count */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedStaff.length} of {filteredStaff.length} staff members
        </Typography>
      </Box>

      <Paper elevation={2}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  {t('employee')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  {t('role')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  {t('workingHours')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  {t('email')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStaff.length > 0 ? (
                paginatedStaff.map((employee) => (
                  <TableRow
                    key={employee.id}
                    hover
                    onClick={() => handleViewEmployee(employee.id)}
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
                          {employee.user.first_name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="medium">
                            {employee.user.first_name} {employee.user.last_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {employee.user.username}
                          </Typography>
                        </Box>
                      </Box>
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
                        gap: 1
                      }}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {formatTime(employee.day_start)} - {formatTime(employee.day_end)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {employee.user.email}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm || selectedRole ? 'No staff members found matching your criteria.' : 'No staff members found.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          component="div"
          count={filteredStaff.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage={t('rowsPerPage')}
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} ${t('of')} ${count !== -1 ? count : `${t('moreThan')} ${to}`}`
          }
        />
      </Paper>
    </Box>
  );
};

export default StaffManagement;