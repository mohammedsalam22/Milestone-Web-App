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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SubjectsTable = ({
  subjects,
  onEditClick,
  onDeleteClick,
  getGradeName,
  getGradeColor,
  getTeacherInitials,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
            <TableCell sx={{ fontWeight: 600 }}>{t('subject')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('grade')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('teachers')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow
              key={subject.id}
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
                    {subject.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {subject.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: #{subject.id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={getGradeName(subject.grade_id)}
                  size="small"
                  color={getGradeColor(getGradeName(subject.grade_id))}
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>
                {subject.teacher && subject.teacher.length > 0 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.7rem' } }}>
                      {subject.teacher.map((teacher, idx) => (
                        <Tooltip key={idx} title={teacher}>
                          <Avatar sx={{ 
                            bgcolor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                          }}>
                            {getTeacherInitials(teacher)}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                    <Typography variant="caption" color="text.secondary">
                      ({subject.teacher.length})
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {t('noTeachers')}
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={t('edit')}>
                    <IconButton onClick={() => onEditClick(subject)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('delete')}>
                    <IconButton onClick={() => onDeleteClick(subject)} color="error" size="small">
                      <DeleteIcon />
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

export default SubjectsTable; 