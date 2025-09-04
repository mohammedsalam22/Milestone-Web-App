import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Avatar,
  Typography,
  useTheme,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const MarksTable = ({ 
  data, 
  onEdit, 
  isRTL,
  isAddMode = false,
  onMarkChange = null,
  onSaveMarks = null,
  onCancelAdd = null,
  markInputs = {},
  setMarkInputs = null,
  readOnly = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getMarkColor = (mark, passMark) => {
    if (mark === 0) return theme.palette.grey[500];
    if (mark >= passMark) return theme.palette.success.main;
    return theme.palette.error.main;
  };

  const getMarkStatus = (mark, passMark) => {
    if (mark === 0) return t('No Mark');
    if (mark >= passMark) return t('Pass');
    return t('Fail');
  };

  const handleMarkInputChange = (studentId, value) => {
    if (setMarkInputs) {
      setMarkInputs(prev => ({
        ...prev,
        [studentId]: value
      }));
    }
  };

  const getMarkValue = (studentId, currentMark) => {
    if (isAddMode && markInputs && markInputs[studentId] !== undefined) {
      return markInputs[studentId];
    }
    return currentMark;
  };

  const getMarkDisplayValue = (studentId, currentMark) => {
    const value = getMarkValue(studentId, currentMark);
    if (isAddMode && value === '') {
      return '';
    }
    return value;
  };

  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {t('No data available')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {isAddMode && !readOnly && (
        <>
          <Alert severity="info" sx={{ mb: 2 }}>
            {t('Enter marks for students. Leave empty for students who already have marks or should not receive marks.')}
          </Alert>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 3, 
            justifyContent: 'center',
            p: 2,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 1,
            border: `2px solid ${theme.palette.primary.main}`,
          }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={onSaveMarks}
              size="large"
              sx={{
                backgroundColor: theme.palette.success.main,
                minWidth: 150,
                '&:hover': {
                  backgroundColor: theme.palette.success.dark,
                },
              }}
            >
              {t('Save Marks')}
            </Button>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={onCancelAdd}
              size="large"
              sx={{
                borderColor: theme.palette.grey[400],
                color: theme.palette.grey[700],
                minWidth: 150,
                '&:hover': {
                  borderColor: theme.palette.grey[600],
                  backgroundColor: theme.palette.grey[50],
                },
              }}
            >
              {t('Cancel')}
            </Button>
          </Box>
        </>
      )}
      
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                {t('Student')}
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                {t('Grade/Section')}
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                {t('Subject')}
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                {t('Mark')}
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                {t('Top Mark')}
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                {t('Pass Mark')}
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                {t('Status')}
              </TableCell>
              {!isAddMode && !readOnly && (
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  {t('Actions')}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              const studentId = row.student.id;
              const currentMark = row.mark;
              const hasExistingMark = currentMark !== 0;
              const markValue = getMarkDisplayValue(studentId, currentMark);
              
              return (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: theme.palette.action.hover,
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.action.selected,
                    },
                    ...(isAddMode && hasExistingMark && {
                      backgroundColor: theme.palette.grey[100],
                      opacity: 0.7,
                    }),
                  }}
                >
                  {/* Student Info */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {`${row.student.card.first_name} ${row.student.card.last_name}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {row.student.user.username}
                        </Typography>
                        {isAddMode && hasExistingMark && (
                          <Chip 
                            label={t('Has Mark')} 
                            size="small" 
                            color="warning" 
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                          />
                        )}
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Grade/Section */}
                  <TableCell>
                    <Typography variant="body2">
                      {`${row.student.section.grade.name}/${row.student.section.name}`}
                    </Typography>
                  </TableCell>

                  {/* Subject */}
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {row.subject_name}
                    </Typography>
                  </TableCell>

                  {/* Mark */}
                  <TableCell>
                    {isAddMode && !hasExistingMark && !readOnly ? (
                      <TextField
                        type="number"
                        size="small"
                        value={markValue}
                        onChange={(e) => handleMarkInputChange(studentId, e.target.value)}
                        inputProps={{
                          min: 0,
                          max: row.top_mark,
                          step: 0.01,
                        }}
                        sx={{
                          width: 80,
                          '& .MuiInputBase-input': {
                            textAlign: 'center',
                            fontWeight: 'bold',
                          },
                        }}
                        placeholder="0"
                      />
                    ) : (
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color={getMarkColor(currentMark, row.pass_mark)}
                      >
                        {currentMark}
                      </Typography>
                    )}
                  </TableCell>

                  {/* Top Mark */}
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {row.top_mark}
                    </Typography>
                  </TableCell>

                  {/* Pass Mark */}
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {row.pass_mark}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {isAddMode && !hasExistingMark && !readOnly ? (
                      <Typography variant="caption" color="text.secondary">
                        {markValue === '' ? t('No Mark') : 
                         parseFloat(markValue) >= row.pass_mark ? t('Pass') : t('Fail')}
                      </Typography>
                    ) : (
                      <Chip
                        label={getMarkStatus(currentMark, row.pass_mark)}
                        size="small"
                        color={
                          currentMark === 0
                            ? 'default'
                            : currentMark >= row.pass_mark
                            ? 'success'
                            : 'error'
                        }
                        variant="outlined"
                      />
                    )}
                  </TableCell>

                  {/* Actions */}
                  {!isAddMode && !readOnly && (
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => onEdit(row)}
                          sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: theme.palette.primary.light,
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MarksTable;
