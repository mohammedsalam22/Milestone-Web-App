import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ScheduleGrid = ({ schedules, selectedSection, onAddPeriod, onEditPeriod, onDeletePeriod }) => {
  const theme = useTheme();

  const days = ['sun', 'mon', 'tue', 'wed', 'thu'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const timeSlots = [
    '08:00:00', '08:45:00', '09:00:00', '09:45:00', '10:00:00', '10:45:00',
    '11:00:00', '11:45:00', '12:00:00', '12:45:00', '13:00:00', '13:45:00'
  ];

  const getScheduleForTimeSlot = (day, startTime) => {
    if (!schedules || !Array.isArray(schedules)) return null;
    
    return schedules.find(schedule => 
      schedule.day === day && schedule.start_time === startTime
    );
  };

  const formatTime = (timeString) => {
    const time = timeString.split(':');
    return `${time[0]}:${time[1]}`;
  };

  // Group time slots into periods (45-minute intervals)
  const periods = [];
  for (let i = 0; i < timeSlots.length; i += 2) {
    if (i + 1 < timeSlots.length) {
      periods.push({
        start: timeSlots[i],
        end: timeSlots[i + 1],
        display: `${formatTime(timeSlots[i])}-${formatTime(timeSlots[i + 1])}`
      });
    }
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  minWidth: 120,
                  py: 2.5,
                  fontSize: '0.875rem',
                  borderBottom: `2px solid ${theme.palette.divider}`,
                }}
              >
                Day
              </TableCell>
              {periods.map((period) => (
                <TableCell
                  key={period.display}
                  align="center"
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    minWidth: 150,
                    py: 2.5,
                    fontSize: '0.875rem',
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  {period.display}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day, dayIndex) => (
              <TableRow key={day} hover>
                <TableCell
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    fontWeight: 600,
                    borderRight: `1px solid ${theme.palette.divider}`,
                    py: 2.5,
                    fontSize: '0.875rem',
                    width: 120,
                  }}
                >
                  <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>
                    {dayNames[dayIndex]}
                  </Typography>
                </TableCell>
                {periods.map((period) => {
                  const schedule = getScheduleForTimeSlot(day, period.start);
                  return (
                    <TableCell
                      key={`${day}-${period.start}`}
                      align="center"
                      sx={{
                        minHeight: 100,
                        position: 'relative',
                        border: `1px solid ${theme.palette.divider}`,
                        py: 1,
                        px: 0.5,
                      }}
                    >
                      {schedule ? (
                        <Box
                          sx={{
                            p: 2,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 2,
                            position: 'relative',
                            border: `1px solid ${theme.palette.divider}`,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover,
                              transform: 'translateY(-2px)',
                              boxShadow: theme.shadows[2],
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box sx={{ flex: 1, cursor: 'pointer' }} onClick={() => onEditPeriod(schedule)}>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {schedule.teacher?.subjects?.[0]?.name || 'No Subject'}
                              </Typography>
                              <Typography variant="caption" display="block" sx={{ mb: 1, opacity: 0.8 }}>
                                {schedule.teacher?.username || 'Unknown Teacher'}
                              </Typography>
                              <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
                                Section {schedule.section?.name || 'Unknown'}
                              </Typography>
                            </Box>
                            <Tooltip title="Delete Period">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Delete button clicked for schedule:', schedule);
                                  onDeletePeriod(schedule);
                                }}
                                sx={{
                                  color: theme.palette.error.main,
                                  p: 0.5,
                                  '&:hover': {
                                    backgroundColor: theme.palette.error.light,
                                    color: theme.palette.error.contrastText,
                                  },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      ) : (
                        <Tooltip title="Add Period">
                          <IconButton
                            size="small"
                            onClick={() => onAddPeriod(day, period.start, period.end)}
                            sx={{
                              color: theme.palette.text.secondary,
                              border: `2px dashed ${theme.palette.divider}`,
                              borderRadius: 2,
                              width: 48,
                              height: 48,
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                color: theme.palette.primary.main,
                                borderColor: theme.palette.primary.main,
                                backgroundColor: theme.palette.action.hover,
                                transform: 'scale(1.05)',
                              },
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScheduleGrid; 