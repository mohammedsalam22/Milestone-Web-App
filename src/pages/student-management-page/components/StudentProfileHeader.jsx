import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Cake,
  Email,
  Phone,
  CalendarToday,
  LocationOn,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const StudentProfileHeader = ({ student, onBack }) => {
  const theme = useTheme();

  const getGenderIcon = (gender) => {
    return gender?.toLowerCase() === 'male' ? <Person /> : <Person />;
  };

  const getGenderColor = (gender) => {
    return gender?.toLowerCase() === 'male' ? 'primary' : 'secondary';
  };

  return (
    <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
      {/* Navigation Bar */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={onBack} 
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
            Back to Students
          </Typography>
        </Box>
        
        <Chip
          icon={getGenderIcon(student.card?.gender)}
          label={student.getFormattedGender()}
          color={getGenderColor(student.card?.gender)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Box>

      {/* Student Profile Header */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Profile Picture */}
          <Grid item xs={12} sm={3} md={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 1,
                  fontSize: '2.5rem',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  boxShadow: theme.shadows[4],
                }}
              >
                {student.getFullName().charAt(0)}
              </Avatar>
            </Box>
          </Grid>

          {/* Student Info */}
          <Grid item xs={12} sm={9} md={10}>
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 700, 
              mb: 1,
              color: theme.palette.text.primary,
            }}>
              {student.getFullName()}
            </Typography>
            
            <Typography variant="h6" sx={{ 
              color: theme.palette.text.secondary,
              fontWeight: 500,
              mb: 2,
            }}>
              {student.getGradeSection()}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={<Cake />}
                label={`${student.getAge() || 'N/A'} years old`}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Chip
                icon={<Email />}
                label={student.card?.email || 'N/A'}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Chip
                icon={<Phone />}
                label={student.card?.phone || 'N/A'}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Chip
                icon={<CalendarToday />}
                label={student.getFormattedRegisterDate()}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Chip
                icon={<LocationOn />}
                label={student.card?.address || 'N/A'}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentProfileHeader; 