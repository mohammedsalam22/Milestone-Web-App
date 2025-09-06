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
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ScheduleGrid = ({ schedules, selectedSection, onAddPeriod, onEditPeriod, onDeletePeriod }) => {

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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>
              Day
            </TableCell>
            {periods.map((period) => (
              <TableCell
                key={period.display}
                align="center"
                sx={{ fontWeight: 600, minWidth: 150 }}
              >
                {period.display}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map((day, dayIndex) => (
            <TableRow key={day}>
              <TableCell sx={{ fontWeight: 600, width: 120 }}>
                {dayNames[dayIndex]}
              </TableCell>
              {periods.map((period) => {
                const schedule = getScheduleForTimeSlot(day, period.start);
                return (
                  <TableCell
                    key={`${day}-${period.start}`}
                    align="center"
                    sx={{ minHeight: 80, position: 'relative' }}
                  >
                    {schedule ? (
                      <Box sx={{ p: 1, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box sx={{ flex: 1, cursor: 'pointer' }} onClick={() => onEditPeriod(schedule)}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {schedule.teacher?.subjects?.[0]?.name || 'No Subject'}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {schedule.teacher?.username || 'Unknown Teacher'}
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeletePeriod(schedule);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={() => onAddPeriod(day, period.start, period.end)}
                        sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}
                      >
                        <AddIcon />
                      </IconButton>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScheduleGrid; 