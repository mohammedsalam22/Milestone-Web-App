import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  AvatarGroup,
  Tooltip,
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
  Collapse,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const IncidentsTable = ({
  incidents,
  onEditClick,
  onDeleteClick,
  expandedRows,
  setExpandedRows,
  students,
  sections,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleExpandRow = (incidentId) => {
    setExpandedRows(prev => ({
      ...prev,
      [incidentId]: !prev[incidentId]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('تنمر') || lowerTitle.includes('bullying')) return 'error';
    if (lowerTitle.includes('مشاجرة') || lowerTitle.includes('fight')) return 'warning';
    if (lowerTitle.includes('تأخير') || lowerTitle.includes('late')) return 'info';
    return 'default';
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
            <TableCell sx={{ fontWeight: 600 }}>{t('incident')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('students')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('procedure')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('date')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map((incident) => (
            <React.Fragment key={incident.id}>
              <TableRow
                sx={{
                  '&:hover': { backgroundColor: theme.palette.action.hover },
                  transition: 'background-color 0.2s ease',
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: theme.palette[getSeverityColor(incident.title)]?.main || theme.palette.primary.main,
                      color: theme.palette[getSeverityColor(incident.title)]?.contrastText || theme.palette.primary.contrastText,
                      width: 40,
                      height: 40,
                    }}>
                      <GroupIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
{t('incidentTitleOptions', { returnObjects: true })[incident.title] || incident.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {incident.note}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.7rem' } }}>
                      {incident.student_names.slice(0, 3).map((student, idx) => (
                        <Tooltip key={idx} title={student.name}>
                          <Avatar sx={{ 
                            bgcolor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                          }}>
                            {student.name.charAt(0).toUpperCase()}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                    {incident.student_names.length > 3 && (
                      <Typography variant="caption" color="text.secondary">
                        +{incident.student_names.length - 3} {t('more')}
                      </Typography>
                    )}
                    <Button
                      size="small"
                      onClick={() => handleExpandRow(incident.id)}
                      sx={{ minWidth: 'auto', p: 0.5 }}
                    >
                      {expandedRows[incident.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200 }}>
{t('procedureOptions', { returnObjects: true })[incident.procedure] || incident.procedure}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(incident.date)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onEditClick(incident)}
                      sx={{
                        color: theme.palette.primary.main,
                        '&:hover': { backgroundColor: theme.palette.primary.light + '20' }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDeleteClick(incident)}
                      sx={{
                        color: theme.palette.error.main,
                        '&:hover': { backgroundColor: theme.palette.error.light + '20' }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              
              {/* Expanded Row for Student Details */}
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                  <Collapse in={expandedRows[incident.id]} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 2 }}>
                      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                        {t('involvedStudents')} ({incident.student_names.length})
                      </Typography>
                                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                         {incident.student_names.map((incidentStudent, idx) => {
                           const fullStudent = students.find(s => s.id === incidentStudent.id);
                           const sectionName = fullStudent?.section?.name || 'Unknown Section';
                           
                           return (
                             <Chip
                               key={idx}
                               label={`${incidentStudent.name} (${sectionName})`}
                               variant="outlined"
                               size="small"
                               sx={{ 
                                 borderColor: theme.palette.primary.main,
                                 color: theme.palette.primary.main,
                               }}
                             />
                           );
                         })}
                       </Box>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncidentsTable;
