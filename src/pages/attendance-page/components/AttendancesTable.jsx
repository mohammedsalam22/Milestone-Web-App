import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  Warning as ExcusedIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const AttendancesTable = ({
  attendances,
  onEditClick,
  onDeleteClick,
  students,
  sections,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getStatusIcon = (absent, excused) => {
    if (!absent) return <PresentIcon color="success" />;
    if (excused) return <ExcusedIcon color="warning" />;
    return <AbsentIcon color="error" />;
  };

  const getStatusColor = (absent, excused) => {
    if (!absent) return 'success';
    if (excused) return 'warning';
    return 'error';
  };

  const getStatusText = (absent, excused) => {
    if (!absent) return t('present');
    if (excused) return t('excused');
    return t('absent');
  };

  const getStudentSection = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student?.section?.name || 'Unknown Section';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
            <TableCell sx={{ fontWeight: 600 }}>{t('student')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('section')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('date')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('status')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('note')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendances.map((attendance) => (
            <TableRow
              key={`${attendance.student_id}-${attendance.date}`}
              sx={{
                '&:hover': { backgroundColor: theme.palette.action.hover },
                transition: 'background-color 0.2s ease',
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    width: 40,
                    height: 40,
                  }}>
                    {attendance.student_name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {attendance.student_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: #{attendance.student_id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStudentSection(attendance.student_id)}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(attendance.date)}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getStatusIcon(attendance.absent, attendance.excused)}
                  <Chip
                    label={getStatusText(attendance.absent, attendance.excused)}
                    size="small"
                    color={getStatusColor(attendance.absent, attendance.excused)}
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ maxWidth: 200 }}>
                  {attendance.note}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={t('editAttendance')}>
                    <IconButton
                      size="small"
                      onClick={() => onEditClick(attendance)}
                      sx={{
                        color: theme.palette.primary.main,
                        '&:hover': { backgroundColor: theme.palette.primary.light + '20' }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('deleteAttendance')}>
                    <IconButton
                      size="small"
                      onClick={() => onDeleteClick(attendance)}
                      sx={{
                        color: theme.palette.error.main,
                        '&:hover': { backgroundColor: theme.palette.error.light + '20' }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendancesTable;
